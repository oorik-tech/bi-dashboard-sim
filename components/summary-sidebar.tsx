"use client"

import { useSimulator } from "@/lib/simulator-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export function SummarySidebar() {
  const { config } = useSimulator()
  const { company, selections, meta } = config
  const [isExpanded, setIsExpanded] = useState(true)

  const totalBaseItems = selections.baseKPIs.length + selections.baseVisuals.length
  const totalPremiumItems = selections.premiumKPIs.length + selections.premiumVisuals.length

  return (
    <div className="lg:sticky lg:top-20 h-fit">
      <Card className="border-2 rounded-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Your Configuration</CardTitle>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden p-1 hover:bg-accent rounded"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">Ref: {meta.refId}</p>
        </CardHeader>

        {isExpanded && (
          <CardContent className="space-y-4">
            <ScrollArea className="max-h-[600px] pr-4">
              <div className="space-y-4">
                {/* Company Info */}
                {company.name && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Company</h4>
                    <div className="space-y-1 text-xs">
                      <p className="text-muted-foreground">{company.name}</p>
                      {company.industry && <p className="text-muted-foreground">{company.industry}</p>}
                    </div>
                  </div>
                )}

                <Separator />

                {/* Base Pack */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Base Pack</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">KPIs</span>
                      <Badge variant="secondary" className="text-xs">
                        {selections.baseKPIs.length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Visuals</span>
                      <Badge variant="secondary" className="text-xs">
                        {selections.baseVisuals.length}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Premium Pack */}
                {totalPremiumItems > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Premium Pack</h4>
                      <div className="space-y-2">
                        {selections.premiumKPIs.length > 0 && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Premium KPIs</span>
                            <Badge variant="secondary" className="text-xs">
                              {selections.premiumKPIs.length}
                            </Badge>
                          </div>
                        )}
                        {selections.premiumVisuals.length > 0 && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Premium Visuals</span>
                            <Badge variant="secondary" className="text-xs">
                              {selections.premiumVisuals.length}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Forecasting & Intelligence - Updated to show pack-level status */}
                <Separator />
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Forecasting & Intelligence</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Basic Forecasting</span>
                      <Badge className="bg-[#03045E] text-white text-xs">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Advanced Forecasting Pack</span>
                      <Badge
                        variant={selections.forecasting.advancedPackEnabled ? "default" : "secondary"}
                        className={
                          selections.forecasting.advancedPackEnabled ? "bg-[#03045E] text-white text-xs" : "text-xs"
                        }
                      >
                        {selections.forecasting.advancedPackEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Intelligence & Predictive Pack</span>
                      <Badge
                        variant={selections.intelligencePackEnabled ? "default" : "secondary"}
                        className={selections.intelligencePackEnabled ? "bg-[#03045E] text-white text-xs" : "text-xs"}
                      >
                        {selections.intelligencePackEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Industry Packs */}
                {selections.industryPacks.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Industry Extensions</h4>
                      <div className="space-y-1.5">
                        {selections.industryPacks.map((pack) => (
                          <div key={pack} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#03045E]" />
                            {pack}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Estimated Build Time */}
                <Separator />
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Estimated Timeline</h4>
                  <p className="text-xs text-muted-foreground">
                    We'll provide a detailed timeline during consultation based on your configuration complexity.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
