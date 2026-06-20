#!/usr/bin/env python3
"""Minimal site cloner for exact front-end preservation."""

import os
import re
import sys
import hashlib
from urllib.parse import urljoin, urlparse
from pathlib import Path

from bs4 import BeautifulSoup
import requests
import cssutils
import logging

BASE_URL = 'https://www.solarsquare.in/'
OUT_DIR = Path('/c/Users/nanda/solarsquare')
OUT_DIR.mkdir(parents=True, exist_ok=True)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
}

cssutils.log.setLevel(logging.CRITICAL)
session = requests.Session()
session.headers.update(HEADERS)

visited = set()
downloaded = {}


def safe_name(url: str) -> str:
    h = hashlib.md5(url.encode()).hexdigest()[:12]
    parsed = urlparse(url)
    ext = os.path.splitext(parsed.path)[1] or '.bin'
    return f"{h}{ext}"


def fetch(url: str) -> requests.Response:
    r = session.get(url, timeout=60)
    r.raise_for_status()
    return r


def write_bytes(path: Path, data: bytes):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)


def download(url: str) -> str | None:
    if url in downloaded:
        return downloaded[url]
    try:
        r = fetch(url)
        name = safe_name(url)
        rel = os.path.relpath(OUT_DIR / name, OUT_DIR)
        write_bytes(OUT_DIR / name, r.content)
        downloaded[url] = rel
        return rel
    except Exception as e:
        print(f'[download failed] {url} -> {e}', file=sys.stderr)
        return None


def extract_css_urls(css_text: str, base: str):
    try:
        sheet = cssutils.parseString(css_text)
    except Exception:
        return
    for rule in sheet:
        if rule.type == rule.IMPORT_RULE:
            if rule.href:
                yield urljoin(base, rule.href)
        if hasattr(rule, 'style'):
            style = rule.style
            for prop in style:
                if prop.name in ('background', 'background-image'):
                    m = re.search(r'url\(\s*(["\']?)([^"\')]+)\1\s*\)', prop.value)
                    if m:
                        yield urljoin(base, m.group(2))


def process_css(css_url: str):
    rel = download(css_url)
    if not rel:
        return
    full_url = urljoin(css_url, rel)
    abs_path = (OUT_DIR / rel).resolve()
    css_text = abs_path.read_text(encoding='utf-8', errors='ignore')
    mapped = []
    for child in extract_css_urls(css_text, css_url):
        mapped.append((child,))
    print(f'[css] {css_url} -> {rel}')


def scrape_page(page_url: str, depth: int = 0, max_depth: int = 2):
    if page_url in visited or depth > max_depth:
        return
    print(f'[page] {page_url} depth={depth}')
    visited.add(page_url)
    try:
        r = fetch(page_url)
    except Exception as e:
        print(f'[page failed] {page_url} -> {e}', file=sys.stderr)
        return
    main_name = 'index.html'
    if page_url != BASE_URL.rstrip('/') + '/':
        parsed = urlparse(page_url)
        main_name = re.sub(r'[^a-zA-Z0-9_-]', '_', parsed.path.strip('/')) or 'index'
        if not main_name.endswith('.html'):
            main_name += '.html'
    main_path = OUT_DIR / main_name
    write_bytes(main_path, r.content)
    print(f'[page saved] {page_url} -> {main_name}')

    text = r.text
    soup = BeautifulSoup(text, 'html.parser')

    # zip/href/src/srcset/data-src tags -> spiders
    for tag, attr in [
        ('a', 'href'), ('link', 'href'), ('img', 'src'), ('img', 'srcset'),
        ('script', 'src'), ('source', 'src'), ('source', 'srcset'), ('video', 'src'),
        ('audio', 'src'), ('track', 'src'), ('embed', 'src'), ('object', 'data')
    ]:
        for el in soup.find_all(tag):
            val = el.get(attr)
            if not val:
                continue
            # srcset may contain multiple URLs, naive split by comma
            urls = []
            if attr == 'srcset':
                for part in val.split(','):
                    u = part.strip().split()[0]
                    if u:
                        urls.append(u)
            else:
                urls = [val.strip()]
            for u in urls:
                abs_u = urljoin(page_url, u)
                parsed_u = urlparse(abs_u)
                if parsed_u.scheme not in ('http', 'https'):
                    continue
                if urlparse(abs_u).netloc != urlparse(BASE_URL).netloc:
                    continue
                download(abs_u)
                if attr == 'href' and tag == 'a' and abs_u.endswith(('.html', '/')) and depth < max_depth:
                    # queue inner page visit
                    scrape_page(abs_u, depth=depth + 1, max_depth=max_depth)

    # style attribute urls
    for el in soup.find_all(style=True):
        style = el['style']
        for m in re.finditer(r'url\(\s*(["\']?)([^"\')]+)\1\s*\)', style):
            u = urljoin(page_url, m.group(2))
            download(u)

    # download linked stylesheets
    for link in soup.find_all('link', rel=lambda x: x and 'stylesheet' in x.lower()):
        href = link.get('href')
        if not href:
            continue
        u = urljoin(page_url, href)
        download(u)
        process_css(u)

    # inline styles within <style> tags
    for st in soup.find_all('style'):
        if st.string:
            for child_url in extract_css_urls(st.string, page_url):
                download(child_url)


if __name__ == '__main__':
    scrape_page(BASE_URL, depth=0, max_depth=2)
    print('\nDone. Files saved under:', OUT_DIR)
    print('Total pages saved:', len(visited))
    print('Total assets downloaded:', len(downloaded))
