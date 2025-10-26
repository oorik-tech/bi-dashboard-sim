"use client"

import { useSimulator } from "@/lib/simulator-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Stepper } from "@/components/stepper"
import { SummarySidebar } from "@/components/summary-sidebar"
import { WizardNavigation } from "@/components/wizard-navigation"
import { Step1Company } from "@/components/steps/step-1-company"
import { Step2BasePack } from "@/components/steps/step-2-base-pack"
import { Step3PremiumKPIs } from "@/components/steps/step-3-premium-kpis"
import { Step4PremiumVisuals } from "@/components/steps/step-4-premium-visuals"
import { Step5Forecasting } from "@/components/steps/step-5-forecasting"
import { Step6Review } from "@/components/steps/step-6-review"
import { motion, AnimatePresence } from "framer-motion"

export default function WizardPage() {
  const { currentStep } = useSimulator()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Company />
      case 2:
        return <Step2BasePack />
      case 3:
        return <Step3PremiumKPIs />
      case 4:
        return <Step4PremiumVisuals />
      case 5:
        return <Step5Forecasting />
      case 6:
        return <Step6Review />
      default:
        return <Step1Company />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Stepper />

      <main className="flex-1 py-8">
        <div className="container px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Main Content */}
            <div className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderStep()}
                  {currentStep !== 6 && <WizardNavigation />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Summary Sidebar */}
            <aside className="lg:block">
              <SummarySidebar />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
