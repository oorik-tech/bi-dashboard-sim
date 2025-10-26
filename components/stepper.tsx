"use client"

import { useSimulator } from "@/lib/simulator-context"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const STEPS = [
  { number: 1, title: "Company & Data" },
  { number: 2, title: "Base Pack" },
  { number: 3, title: "Premium KPIs" },
  { number: 4, title: "Premium Visuals" },
  { number: 5, title: "Forecasting & Intelligence" },
  { number: 6, title: "Review & Consultation" },
]

export function Stepper() {
  const { currentStep } = useSimulator()

  return (
    <div className="border-b bg-background">
      <div className="container px-6 py-4">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-colors",
                    currentStep === step.number && "border-[#03045E] bg-[#03045E] text-white",
                    currentStep > step.number && "border-[#03045E] bg-[#03045E] text-white",
                    currentStep < step.number && "border-border bg-background text-muted-foreground",
                  )}
                >
                  {currentStep > step.number ? <Check className="h-5 w-5" /> : step.number}
                </div>
                <div className="hidden md:block">
                  <p
                    className={cn(
                      "text-sm font-medium transition-colors",
                      currentStep >= step.number ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </p>
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 flex-1 transition-colors",
                    currentStep > step.number ? "bg-[#03045E]" : "bg-border",
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
