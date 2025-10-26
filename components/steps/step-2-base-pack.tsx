"use client"

import { useSimulator } from "@/lib/simulator-context"
import { BASE_KPIS, BASE_VISUALS } from "@/lib/catalog-data"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Step2BasePack() {
  const { config, toggleBaseKPI, toggleBaseVisual } = useSimulator()
  const { baseKPIs, baseVisuals } = config.selections

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Base Pack</h2>
        <p className="text-muted-foreground">
          These foundational KPIs and visualizations are included with every dashboard. You can customize which ones you
          need.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Base KPIs Card */}
        <Card className="border-2 rounded-2xl">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Base KPI Pack
                  <Badge variant="secondary" className="bg-[#03045E] text-white">
                    Included
                  </Badge>
                </CardTitle>
                <CardDescription className="mt-2">
                  {baseKPIs.length} of {BASE_KPIS.length} KPIs selected
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible defaultValue="kpis">
              <AccordionItem value="kpis" className="border-none">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">View all KPIs</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {BASE_KPIS.map((kpi) => (
                      <div key={kpi} className="flex items-start space-x-3">
                        <Checkbox
                          id={`base-kpi-${kpi}`}
                          checked={baseKPIs.includes(kpi)}
                          onCheckedChange={() => toggleBaseKPI(kpi)}
                        />
                        <Label
                          htmlFor={`base-kpi-${kpi}`}
                          className="text-sm font-normal cursor-pointer leading-relaxed"
                        >
                          {kpi}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Base Visuals Card */}
        <Card className="border-2 rounded-2xl">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Base Visualization Pack (Included)
                  <Badge variant="secondary" className="bg-[#03045E] text-white">
                    Included
                  </Badge>
                </CardTitle>
                <CardDescription className="mt-2">
                  {baseVisuals.length} of {BASE_VISUALS.length} visualizations selected
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible defaultValue="visuals">
              <AccordionItem value="visuals" className="border-none">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  View all visualizations
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {BASE_VISUALS.map((visual) => (
                      <div key={visual.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={`base-visual-${visual.id}`}
                          checked={baseVisuals.includes(visual.id)}
                          onCheckedChange={() => toggleBaseVisual(visual.id)}
                        />
                        <Label
                          htmlFor={`base-visual-${visual.id}`}
                          className="text-sm font-normal cursor-pointer leading-normal"
                        >
                          {visual.title}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg bg-muted p-4 border">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Note:</strong> These base features are included in every oorIk BI
          Dashboard. You can deselect items you don't need, but we recommend keeping the full base pack for
          comprehensive business insights.
        </p>
      </div>
    </div>
  )
}
