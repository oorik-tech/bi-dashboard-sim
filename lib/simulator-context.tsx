"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { SimulatorConfig, CompanyInfo } from "./types"
import { BASE_KPIS, BASE_VISUALS, BASIC_FORECASTING } from "./catalog-data"

interface SimulatorContextType {
  config: SimulatorConfig
  currentStep: number
  updateCompany: (company: Partial<CompanyInfo>) => void
  updateSelections: (selections: Partial<SimulatorConfig["selections"]>) => void
  toggleBaseKPI: (kpi: string) => void
  toggleBaseVisual: (visual: string) => void
  togglePremiumKPI: (kpi: string) => void
  togglePremiumVisual: (visual: string) => void
  toggleBasicForecasting: (feature: string) => void
  toggleAdvancedForecastingPack: () => void
  toggleIntelligencePack: () => void
  toggleIndustryPack: (pack: string) => void
  setStep: (step: number) => void
  resetConfig: () => void
}

const SimulatorContext = createContext<SimulatorContextType | undefined>(undefined)

function generateRefId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let id = "OBI-"
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}

function getInitialConfig(): SimulatorConfig {
  const expectedBaseVisuals = BASE_VISUALS.map((v) => v.id)

  if (typeof window !== "undefined") {
    localStorage.removeItem("oorik-bi-config")
  }

  // Return fresh config with all base visuals and KPIs preselected
  return {
    company: {
      name: "",
      industry: "",
      businessSize: "",
      employees: 0,
      dataSources: [],
      notes: "",
      dataMigrationNeeded: false,
    },
    selections: {
      baseKPIs: [...BASE_KPIS],
      baseVisuals: expectedBaseVisuals,
      premiumKPIs: [],
      premiumVisuals: [],
      forecasting: {
        basic: [...BASIC_FORECASTING],
        advancedPackEnabled: false,
      },
      intelligencePackEnabled: false,
      industryPacks: [],
    },
    meta: {
      refId: generateRefId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }
}

export function SimulatorProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SimulatorConfig>(getInitialConfig)
  const [currentStep, setCurrentStep] = useState(1)

  // useEffect removed - no longer saving to localStorage

  const updateCompany = (company: Partial<CompanyInfo>) => {
    setConfig((prev) => ({
      ...prev,
      company: { ...prev.company, ...company },
      meta: { ...prev.meta, updatedAt: new Date().toISOString() },
    }))
  }

  const updateSelections = (selections: Partial<SimulatorConfig["selections"]>) => {
    setConfig((prev) => ({
      ...prev,
      selections: { ...prev.selections, ...selections },
      meta: { ...prev.meta, updatedAt: new Date().toISOString() },
    }))
  }

  const toggleBaseKPI = (kpi: string) => {
    setConfig((prev) => ({
      ...prev,
      selections: {
        ...prev.selections,
        baseKPIs: prev.selections.baseKPIs.includes(kpi)
          ? prev.selections.baseKPIs.filter((k) => k !== kpi)
          : [...prev.selections.baseKPIs, kpi],
      },
      meta: { ...prev.meta, updatedAt: new Date().toISOString() },
    }))
  }

  const toggleBaseVisual = (visualId: string) => {
    setConfig((prev) => ({
      ...prev,
      selections: {
        ...prev.selections,
        baseVisuals: prev.selections.baseVisuals.includes(visualId)
          ? prev.selections.baseVisuals.filter((v) => v !== visualId)
          : [...prev.selections.baseVisuals, visualId],
      },
      meta: { ...prev.meta, updatedAt: new Date().toISOString() },
    }))
  }

  const togglePremiumKPI = (kpi: string) => {
    setConfig((prev) => ({
      ...prev,
      selections: {
        ...prev.selections,
        premiumKPIs: prev.selections.premiumKPIs.includes(kpi)
          ? prev.selections.premiumKPIs.filter((k) => k !== kpi)
          : [...prev.selections.premiumKPIs, kpi],
      },
      meta: { ...prev.meta, updatedAt: new Date().toISOString() },
    }))
  }

  const togglePremiumVisual = (visual: string) => {
    setConfig((prev) => ({
      ...prev,
      selections: {
        ...prev.selections,
        premiumVisuals: prev.selections.premiumVisuals.includes(visual)
          ? prev.selections.premiumVisuals.filter((v) => v !== visual)
          : [...prev.selections.premiumVisuals, visual],
      },
      meta: { ...prev.meta, updatedAt: new Date().toISOString() },
    }))
  }

  const toggleBasicForecasting = (feature: string) => {
    setConfig((prev) => ({
      ...prev,
      selections: {
        ...prev.selections,
        forecasting: {
          ...prev.selections.forecasting,
          basic: prev.selections.forecasting.basic.includes(feature)
            ? prev.selections.forecasting.basic.filter((f) => f !== feature)
            : [...prev.selections.forecasting.basic, feature],
        },
      },
      meta: { ...prev.meta, updatedAt: new Date().toISOString() },
    }))
  }

  const toggleAdvancedForecastingPack = () => {
    setConfig((prev) => ({
      ...prev,
      selections: {
        ...prev.selections,
        forecasting: {
          ...prev.selections.forecasting,
          advancedPackEnabled: !prev.selections.forecasting.advancedPackEnabled,
        },
      },
      meta: { ...prev.meta, updatedAt: new Date().toISOString() },
    }))
  }

  const toggleIntelligencePack = () => {
    setConfig((prev) => ({
      ...prev,
      selections: {
        ...prev.selections,
        intelligencePackEnabled: !prev.selections.intelligencePackEnabled,
      },
      meta: { ...prev.meta, updatedAt: new Date().toISOString() },
    }))
  }

  const toggleIndustryPack = (pack: string) => {
    setConfig((prev) => ({
      ...prev,
      selections: {
        ...prev.selections,
        industryPacks: prev.selections.industryPacks.includes(pack)
          ? prev.selections.industryPacks.filter((p) => p !== pack)
          : [...prev.selections.industryPacks, pack],
      },
      meta: { ...prev.meta, updatedAt: new Date().toISOString() },
    }))
  }

  const setStep = (step: number) => {
    setCurrentStep(step)
  }

  const resetConfig = () => {
    const newConfig = getInitialConfig()
    setConfig(newConfig)
    setCurrentStep(1)
  }

  return (
    <SimulatorContext.Provider
      value={{
        config,
        currentStep,
        updateCompany,
        updateSelections,
        toggleBaseKPI,
        toggleBaseVisual,
        togglePremiumKPI,
        togglePremiumVisual,
        toggleBasicForecasting,
        toggleAdvancedForecastingPack,
        toggleIntelligencePack,
        toggleIndustryPack,
        setStep,
        resetConfig,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  )
}

export function useSimulator() {
  const context = useContext(SimulatorContext)
  if (!context) {
    throw new Error("useSimulator must be used within SimulatorProvider")
  }
  return context
}
