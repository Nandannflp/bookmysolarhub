const fs = require('fs');
const css = `
/* SaaS-Style FAQ Refactor */
.faq-section .accordion-item {
  border-radius: 12px !important;
  overflow: hidden !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02) !important;
  margin-bottom: 0 !important;
  background-color: #ffffff !important;
}

.faq-section .accordion-button {
  padding: 24px !important;
  font-weight: 600 !important;
  font-size: 16px !important;
  color: #111827 !important;
  background-color: transparent !important;
  box-shadow: none !important;
  align-items: center !important;
}

.faq-section .accordion-button:not(.collapsed) {
  background-color: transparent !important;
  color: #111827 !important;
}

.faq-section .accordion-body {
  padding: 0 24px 24px 24px !important;
  font-size: 15px !important;
  color: #4b5563 !important;
}
`;
fs.appendFileSync('frontend/src/app/theme.css', css);
console.log("Appended CSS successfully.");
