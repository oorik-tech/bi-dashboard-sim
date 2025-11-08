"use client"

import { useSimulator } from "@/lib/simulator-context"
import {
  BASIC_FORECASTING,
  ADVANCED_FORECASTING_FEATURES,
  INTELLIGENCE_PREDICTIVE_FEATURES,
  INDUSTRY_PACKS,
} from "@/lib/catalog-data"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Brain, Briefcase } from "lucide-react"

export function Step5Forecasting() {
  const { config, toggleBasicForecasting, toggleAdvancedForecastingPack, toggleIntelligencePack, toggleIndustryPack } =
    useSimulator()
  const { forecasting, intelligencePackEnabled, industryPacks } = config.selections

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Forecasting & Intelligence</h2>
        <p className="text-muted-foreground">
          Add predictive capabilities and AI-powered insights to transform your dashboard from reactive to proactive.
        </p>
      </div>

      {/* A) Basic Forecasting - Included */}
      <Card className="border-2 rounded-2xl">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-[#03045E]" />
              <div>
                <CardTitle className="flex items-center gap-2">
                  Basic Forecasting
                  <Badge className="bg-[#03045E] text-white hover:bg-[#03045E]/90">Included</Badge>
                </CardTitle>
                <CardDescription className="mt-1">
                  {forecasting.basic.length} of {BASIC_FORECASTING.length} features selected
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {BASIC_FORECASTING.map((feature) => (
              <div key={feature} className="flex items-start space-x-3">
                <Checkbox
                  id={`basic-forecast-${feature}`}
                  checked={forecasting.basic.includes(feature)}
                  onCheckedChange={() => toggleBasicForecasting(feature)}
                />
                <Label
                  htmlFor={`basic-forecast-${feature}`}
                  className="text-sm font-normal cursor-pointer leading-relaxed"
                >
                  {feature}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* B) Advanced Forecasting Pack - Single pack-level checkbox */}
      <Card className="border-2 rounded-2xl hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <TrendingUp className="h-5 w-5 text-[#03045E]" />
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  Advanced Forecasting Pack
                  <Badge variant="secondary">Optional</Badge>
                </CardTitle>
                <CardDescription className="mt-1">Machine learning-powered forecasting capabilities</CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="advanced-pack-toggle"
                checked={forecasting.advancedPackEnabled}
                onCheckedChange={toggleAdvancedForecastingPack}
              />
              <Label htmlFor="advanced-pack-toggle" className="text-sm font-medium cursor-pointer">
                Enable this Pack
              </Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={`grid gap-2 sm:grid-cols-2 transition-opacity ${
              forecasting.advancedPackEnabled ? "opacity-100" : "opacity-50"
            }`}
          >
            {ADVANCED_FORECASTING_FEATURES.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-[#03045E] mt-1.5 shrink-0" />
                <span className="text-muted-foreground leading-snug">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* C) Intelligence & Predictive Pack - Single pack-level checkbox */}
      <Card className="border-2 rounded-2xl hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Brain className="h-5 w-5 text-[#03045E]" />
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  Intelligence & Predictive Pack
                  <Badge variant="secondary">Optional</Badge>
                </CardTitle>
                <CardDescription className="mt-1">AI-powered insights and recommendations</CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="intelligence-pack-toggle"
                checked={intelligencePackEnabled}
                onCheckedChange={toggleIntelligencePack}
              />
              <Label htmlFor="intelligence-pack-toggle" className="text-sm font-medium cursor-pointer">
                Enable this Pack
              </Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={`grid gap-2 sm:grid-cols-2 transition-opacity ${
              intelligencePackEnabled ? "opacity-100" : "opacity-50"
            }`}
          >
            {INTELLIGENCE_PREDICTIVE_FEATURES.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-[#03045E] mt-1.5 shrink-0" />
                <span className="text-muted-foreground leading-snug">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* D) Industry Extensions */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Briefcase className="h-5 w-5 text-[#03045E]" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Industry Extensions</h3>
            <p className="text-sm text-muted-foreground">Specialized KPIs and metrics tailored to your industry</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(INDUSTRY_PACKS).map(([industry, features]) => {
            const isSelected = industryPacks.includes(industry)

            return (
              <Card
                key={industry}
                className={`cursor-pointer transition-all hover:shadow-md rounded-2xl ${
                  isSelected ? "border-[#03045E] border-2 bg-[#03045E]/5" : "border-2"
                }`}
                onClick={() => toggleIndustryPack(industry)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{industry}</CardTitle>
                    <Checkbox id={`industry-${industry}`} checked={isSelected} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1.5">
                    {features.slice(0, 5).map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="rounded-lg bg-muted p-4 border">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Note:</strong> Advanced forecasting and intelligence packs leverage
          machine learning to provide predictive insights. Industry extensions add domain-specific metrics relevant to
          your sector.
        </p>
      </div>
    </div>
  )
}
