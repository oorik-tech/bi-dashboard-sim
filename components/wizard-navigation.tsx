"use client"

import { useSimulator } from "@/lib/simulator-context"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface WizardNavigationProps {
  onNext?: () => boolean
  onBack?: () => void
  nextLabel?: string
  isLastStep?: boolean
}

export function WizardNavigation({ onNext, onBack, nextLabel = "Next", isLastStep = false }: WizardNavigationProps) {
  const { currentStep, setStep, config } = useSimulator()

  const handleNext = () => {
    // Validate Step 1
    if (currentStep === 1) {
      const { company } = config
      if (
        !company.name ||
        !company.industry ||
        !company.businessSize ||
        !company.employees ||
        company.dataSources.length === 0
      ) {
        alert("Please fill in all required fields before proceeding.")
        return
      }
    }

    // Custom validation if provided
    if (onNext && !onNext()) {
      return
    }

    if (currentStep < 6) {
      setStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    }
    if (currentStep > 1) {
      setStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="flex items-center justify-between pt-8 border-t">
      <Button variant="outline" onClick={handleBack} disabled={currentStep === 1} className="gap-2 bg-transparent">
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      <Button
        onClick={handleNext}
        disabled={isLastStep}
        className="gap-2 bg-[#03045E] hover:bg-[#03045E]/90 text-white"
      >
        {nextLabel}
        {!isLastStep && <ChevronRight className="h-4 w-4" />}
      </Button>
    </div>
  )
}
