// Core types for the BI Dashboard Simulator

export interface CompanyInfo {
  name: string
  industry: string
  businessSize: string
  employees: number
  dataSources: string[]
  notes: string
  dataMigrationNeeded: boolean
}

export interface SimulatorConfig {
  company: CompanyInfo
  selections: {
    baseKPIs: string[]
    baseVisuals: string[]
    premiumKPIs: string[]
    premiumVisuals: string[]
    customKPINote?: string
    customVisualNote?: string
    forecasting: {
      basic: string[]
      advancedPackEnabled: boolean
    }
    intelligencePackEnabled: boolean
    industryPacks: string[]
  }
  meta: {
    refId: string
    createdAt: string
    updatedAt: string
  }
}

export interface ContactInfo {
  name: string
  email: string
  phone: string
  preferredTime: string
  consent: boolean
}

export const INDUSTRIES = [
  "Technology/SaaS",
  "Real Estate/Construction",
  "E-Commerce",
  "Retail/Commerce",
  "Manufacturing",
  "Finance/Banking",
  "Healthcare",
  "Logistics/Supply Chain",
  "Education/Training",
  "Other",
] as const

export const BUSINESS_SIZES = [
  "Startup (1-10)",
  "Small (11-50)",
  "Medium (51-200)",
  "Large (201-1000)",
  "Enterprise (1000+)",
] as const

export const DATA_SOURCES = ["Excel", "SQL", "Tally", "Zoho", "Shopify", "Other"] as const
