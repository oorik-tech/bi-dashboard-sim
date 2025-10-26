"use client"

import { useState } from "react"
import { useSimulator } from "@/lib/simulator-context"
import { PREMIUM_KPIS } from "@/lib/catalog-data"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

export function Step3PremiumKPIs() {
  const { config, togglePremiumKPI, updateSelections } = useSimulator()
  const { premiumKPIs, customKPINote } = config.selections
  const [searchQuery, setSearchQuery] = useState("")
  const [requestCustom, setRequestCustom] = useState(!!customKPINote)

  const filteredCategories = Object.entries(PREMIUM_KPIS).reduce(
    (acc, [category, kpis]) => {
      const filteredKPIs = kpis.filter(
        (kpi) =>
          kpi.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      if (filteredKPIs.length > 0) {
        acc[category] = filteredKPIs
      }
      return acc
    },
    {} as Record<string, string[]>,
  )

  const totalPremiumKPIs = Object.values(PREMIUM_KPIS).flat().length

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Premium KPI Pack</h2>
          <p className="text-muted-foreground">
            Enhance your dashboard with advanced KPIs tailored to specific business functions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="custom-kpi-switch" className="text-sm font-medium whitespace-nowrap">
            Request Custom KPIs
          </Label>
          <Switch
            id="custom-kpi-switch"
            checked={requestCustom}
            onCheckedChange={(checked) => {
              setRequestCustom(checked)
              if (!checked) {
                updateSelections({ customKPINote: undefined })
              }
            }}
          />
        </div>
      </div>

      {requestCustom && (
        <Card className="border-[#03045E] border-2 bg-[#03045E]/5">
          <CardHeader>
            <CardTitle className="text-base">Describe Custom KPIs</CardTitle>
            <CardDescription>Tell us about the specific KPIs you'd like to track</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Example: Track customer acquisition cost by marketing channel, monitor real-time inventory levels across warehouses..."
              value={customKPINote || ""}
              onChange={(e) => updateSelections({ customKPINote: e.target.value })}
              rows={4}
            />
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search KPIs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="outline" className="text-sm">
          {premiumKPIs.length} of {totalPremiumKPIs} selected
        </Badge>
      </div>

      {Object.keys(filteredCategories).length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No items match your search.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {Object.entries(filteredCategories).map(([category, kpis]) => {
            const categorySelected = kpis.filter((kpi) => premiumKPIs.includes(kpi)).length

            return (
              <Card key={category} className="border-2 hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{category}</CardTitle>
                      <CardDescription className="mt-1">
                        {categorySelected} of {kpis.length} selected
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {kpis.map((kpi) => (
                      <div key={kpi} className="flex items-start space-x-3">
                        <Checkbox
                          id={`premium-kpi-${kpi}`}
                          checked={premiumKPIs.includes(kpi)}
                          onCheckedChange={() => togglePremiumKPI(kpi)}
                        />
                        <Label
                          htmlFor={`premium-kpi-${kpi}`}
                          className="text-sm font-normal cursor-pointer leading-relaxed"
                        >
                          {kpi}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <div className="rounded-lg bg-muted p-4 border">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Tip:</strong> Premium KPIs provide deeper insights into specific business
          areas. Select the categories most relevant to your strategic goals.
        </p>
      </div>
    </div>
  )
}
