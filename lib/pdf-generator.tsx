// PDF generation utility
// This is a stub implementation. In production, you would use a library like:
// - jsPDF + html2canvas for client-side generation
// - Puppeteer or Playwright for server-side generation
// - A dedicated PDF service like PDFKit or React-PDF

import type { SimulatorConfig } from "./types"

export function generatePDFSummary(config: SimulatorConfig): string {
  // For now, return a formatted text summary that can be printed
  // In production, this would generate an actual PDF blob

  const { company, selections, meta } = config

  const summary = `
oorIk BI Dashboard Configuration Summary
========================================

Reference ID: ${meta.refId}
Generated: ${new Date(meta.createdAt).toLocaleDateString()}

COMPANY INFORMATION
-------------------
Company Name: ${company.name}
Industry: ${company.industry}
Business Size: ${company.businessSize}
Employees: ${company.employees}
Data Sources: ${company.dataSources.join(", ")}

Requirements:
${company.requireOnPrem ? "✓" : "✗"} On-premise installation
${company.dataMigrationNeeded ? "✓" : "✗"} Data migration needed
${company.customKPIsNeeded ? "✓" : "✗"} Custom KPIs required

${company.notes ? `Notes: ${company.notes}` : ""}

SELECTED FEATURES
-----------------
Base Pack:
  - KPIs: ${selections.baseKPIs.length} selected
  - Visualizations: ${selections.baseVisuals.length} selected

Premium Pack:
  - Premium KPIs: ${selections.premiumKPIs.length} selected
  - Premium Visualizations: ${selections.premiumVisuals.length} selected

Forecasting:
  - Basic Features: ${selections.forecasting.basic.length} selected
  - Advanced Pack: ${selections.forecasting.advancedEnabled ? "Enabled" : "Not selected"}

Intelligence:
  - AI/Predictive Pack: ${selections.intelligenceEnabled ? "Enabled" : "Not selected"}

Industry Extensions:
${selections.industryPacks.length > 0 ? selections.industryPacks.map((pack) => `  - ${pack}`).join("\n") : "  None selected"}

========================================
This configuration is a starting point. We'll validate data sources
and finalize scope during consultation.

© ${new Date().getFullYear()} oorIk Technologies
  `.trim()

  return summary
}

// Client-side function to trigger print dialog with formatted summary
export function printConfigurationSummary(config: SimulatorConfig) {
  const summary = generatePDFSummary(config)

  // Create a new window with the summary
  const printWindow = window.open("", "_blank")
  if (!printWindow) {
    alert("Please allow pop-ups to print the summary")
    return
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>oorIk BI Configuration - ${config.meta.refId}</title>
        <style>
          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            line-height: 1.6;
            color: #111827;
          }
          h1 {
            color: #03045E;
            border-bottom: 3px solid #03045E;
            padding-bottom: 10px;
          }
          h2 {
            color: #03045E;
            margin-top: 30px;
            border-bottom: 1px solid #E5E7EB;
            padding-bottom: 5px;
          }
          pre {
            white-space: pre-wrap;
            font-family: inherit;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .logo {
            width: 60px;
            height: 60px;
            background: #03045E;
            border-radius: 50%;
            margin: 0 auto 20px;
          }
          @media print {
            body {
              margin: 0;
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo"></div>
          <h1>oorIk BI Dashboard Configuration</h1>
        </div>
        <pre>${summary}</pre>
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
    </html>
  `)

  printWindow.document.close()
}
