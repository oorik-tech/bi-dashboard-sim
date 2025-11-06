"use client"

import type React from "react"

import { useState } from "react"
import { useSimulator } from "@/lib/simulator-context"
import type { ContactInfo } from "@/lib/types"
import { printConfigurationSummary } from "@/lib/pdf-generator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Download, RotateCcw, Printer } from "lucide-react"

export function Step6Review() {
  const { config, resetConfig } = useSimulator()
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    consent: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!contactInfo.name || !contactInfo.email || !contactInfo.consent) {
      alert("Please fill in all required fields and accept the consent.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config, contact: contactInfo }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert("Failed to submit configuration. Please try again.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(config, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `oorik-bi-config-${config.meta.refId}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handlePrintSummary = () => {
    printConfigurationSummary(config)
  }

  if (isSubmitted) {
    return (
      <div className="space-y-8">
        <Card className="border-2 border-[#03045E]">
          <CardContent className="pt-12 pb-12 text-center">
            <CheckCircle2 className="h-16 w-16 text-[#03045E] mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Configuration Submitted!</h2>
            <p className="text-muted-foreground mb-4">
              Thank you for configuring your BI Dashboard. We'll contact you shortly with a personalized proposal.
            </p>
            <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
              <span className="text-sm text-muted-foreground">Reference ID:</span>
              <Badge variant="outline" className="font-mono text-base">
                {config.meta.refId}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={handlePrintSummary} className="gap-2 bg-transparent">
            <Printer className="h-4 w-4" />
            Print Summary
          </Button>
          <Button variant="outline" onClick={handleDownloadJSON} className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Download JSON
          </Button>
          <Button
            onClick={() => {
              resetConfig()
              setIsSubmitted(false)
              setContactInfo({
                name: "",
                email: "",
                phone: "",
                preferredTime: "",
                consent: false,
              })
            }}
            className="gap-2 bg-[#03045E] hover:bg-[#03045E]/90 text-white"
          >
            <RotateCcw className="h-4 w-4" />
            Start Over
          </Button>
        </div>
      </div>
    )
  }

  const { company, selections } = config
  const totalBaseItems = selections.baseKPIs.length + selections.baseVisuals.length
  const totalPremiumItems = selections.premiumKPIs.length + selections.premiumVisuals.length
  const totalForecastingItems = selections.forecasting.basic.length + (selections.forecasting.advancedPackEnabled ? 1 : 0)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Review & Request Consultation</h2>
        <p className="text-muted-foreground">
          Review your configuration and provide your contact details. We'll reach out with a tailored proposal and
          pricing.
        </p>
      </div>

      {/* Configuration Summary */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Your Configuration</CardTitle>
              <CardDescription className="mt-1">Reference ID: {config.meta.refId}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrintSummary} className="gap-2 bg-transparent">
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadJSON} className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                JSON
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Company Information</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company:</span>
                <span className="font-medium">{company.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Industry:</span>
                <span className="font-medium">{company.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span className="font-medium">{company.businessSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Employees:</span>
                <span className="font-medium">{company.employees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Sources:</span>
                <span className="font-medium">{company.dataSources.join(", ")}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Selections Summary */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Selected Features</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Base Pack (KPIs + Visuals)</span>
                <Badge variant="secondary">{totalBaseItems} items</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Premium Pack (KPIs + Visuals)</span>
                <Badge variant="secondary">{totalPremiumItems} items</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Forecasting Features</span>
                <Badge variant="secondary">{totalForecastingItems} items</Badge>
              </div>
              {selections.intelligencePackEnabled && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Intelligence Pack</span>
                  <Badge className="bg-[#03045E] text-white">Enabled</Badge>
                </div>
              )}
              {selections.industryPacks.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Industry Extensions</span>
                  <Badge variant="secondary">{selections.industryPacks.length} packs</Badge>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Requirements */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Additional Requirements</h3>
            <div className="space-y-2 text-sm">
              {company.requireOnPrem && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#03045E]" />
                  <span>On-premise installation required</span>
                </div>
              )}
              {company.dataMigrationNeeded && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#03045E]" />
                  <span>Data migration needed</span>
                </div>
              )}
              {company.customKPIsNeeded && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#03045E]" />
                  <span>Custom KPIs required</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>We'll use these details to send you a personalized quote</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Full Name *</Label>
                <Input
                  id="contact-name"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Work Email *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  placeholder="john@company.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone Number</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-time">Preferred Contact Time</Label>
                <Input
                  id="contact-time"
                  value={contactInfo.preferredTime}
                  onChange={(e) => setContactInfo({ ...contactInfo, preferredTime: e.target.value })}
                  placeholder="e.g., Weekdays 2-4 PM EST"
                />
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="consent"
                checked={contactInfo.consent}
                onCheckedChange={(checked) => setContactInfo({ ...contactInfo, consent: checked as boolean })}
                required
              />
              <Label htmlFor="consent" className="text-sm font-normal cursor-pointer leading-relaxed">
                I agree to be contacted for a consultation and acknowledge this is a non-binding configuration. Your
                configuration is a starting point. We'll validate data sources and finalize scope during consultation.
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#03045E] hover:bg-[#03045E]/90 text-white"
            >
              {isSubmitting ? "Submitting..." : "Request Personalized Quote"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="rounded-lg bg-muted p-4 border">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">No pricing displayed:</strong> Every oorIk BI Dashboard is customized to
          your specific needs. We'll provide a detailed proposal with transparent pricing based on your configuration,
          data complexity, and deployment requirements.
        </p>
      </div>
    </div>
  )
}
