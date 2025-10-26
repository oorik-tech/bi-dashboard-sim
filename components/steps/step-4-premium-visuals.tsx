"use client"

import { useState } from "react"
import { useSimulator } from "@/lib/simulator-context"
import { PREMIUM_VISUALS } from "@/lib/catalog-data"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, BarChart3 } from "lucide-react"

export function Step4PremiumVisuals() {
  const { config, updateSelections } = useSimulator()
  const { premiumVisuals, customVisualNote } = config.selections
  const [searchQuery, setSearchQuery] = useState("")
  const [requestCustom, setRequestCustom] = useState(!!customVisualNote)

  const filteredVisuals = PREMIUM_VISUALS.filter(
    (visual) =>
      visual.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visual.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleVisual = (visualId: string) => {
    const isSelected = premiumVisuals.includes(visualId)
    updateSelections({
      premiumVisuals: isSelected ? premiumVisuals.filter((id) => id !== visualId) : [...premiumVisuals, visualId],
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Premium Visualization Pack</h2>
          <p className="text-muted-foreground">
            Advanced visualization types to present your data in compelling, actionable formats.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="custom-visual-switch" className="text-sm font-medium whitespace-nowrap">
            Request Custom Visuals
          </Label>
          <Switch
            id="custom-visual-switch"
            checked={requestCustom}
            onCheckedChange={(checked) => {
              setRequestCustom(checked)
              if (!checked) {
                updateSelections({ customVisualNote: undefined })
              }
            }}
          />
        </div>
      </div>

      {requestCustom && (
        <Card className="border-[#03045E] border-2 bg-[#03045E]/5">
          <CardHeader>
            <CardTitle className="text-base">Describe Custom Visualizations</CardTitle>
            <CardDescription>Tell us about the specific charts or visuals you need</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Example: Need a custom network diagram showing supplier relationships, or a 3D visualization of warehouse space utilization..."
              value={customVisualNote || ""}
              onChange={(e) => updateSelections({ customVisualNote: e.target.value })}
              rows={4}
            />
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search visualizations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="outline" className="text-sm">
          {premiumVisuals.length} of {PREMIUM_VISUALS.length} selected
        </Badge>
      </div>

      {filteredVisuals.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No items match your search.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVisuals.map((visual) => {
            const isSelected = premiumVisuals.includes(visual.id)

            return (
              <Card
                key={visual.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? "border-[#03045E] border-2 bg-[#03045E]/5" : "border-2"
                }`}
                onClick={() => toggleVisual(visual.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox id={`visual-${visual.id}`} checked={isSelected} className="mt-1" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-2">
                        <BarChart3 className="h-4 w-4 text-[#03045E] mt-0.5 flex-shrink-0" />
                        <Label
                          htmlFor={`visual-${visual.id}`}
                          className="text-sm font-semibold cursor-pointer leading-snug"
                        >
                          {visual.title}
                        </Label>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{visual.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <div className="rounded-lg bg-muted p-4 border">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Tip:</strong> Premium visualizations enable sophisticated data
          storytelling. Choose chart types that align with your audience's analytical needs.
        </p>
      </div>
    </div>
  )
}
