import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp/FloatingWhatsApp";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "BookMySolarHub | India's Trusted Solar Platform",
  description: "End-to-end solar solutions: installation, servicing, insurance, and subsidy assistance for homeowners and businesses in India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Providers attribute="data-theme" defaultTheme="system" enableSystem>
          <Header />
          <main style={{ minHeight: '100vh' }}>
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
