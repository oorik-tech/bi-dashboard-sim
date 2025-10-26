"use client"

import { useSimulator } from "@/lib/simulator-context"
import { INDUSTRIES, BUSINESS_SIZES, DATA_SOURCES } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function Step1Company() {
  const { config, updateCompany } = useSimulator()
  const { company } = config

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Company & Data Information</h2>
        <p className="text-muted-foreground">
          Tell us about your organization and data sources to help us understand your needs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company-name">Company Name *</Label>
          <Input
            id="company-name"
            value={company.name}
            onChange={(e) => updateCompany({ name: e.target.value })}
            placeholder="Enter your company name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry *</Label>
          <Select value={company.industry} onValueChange={(value) => updateCompany({ industry: value })}>
            <SelectTrigger id="industry">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="business-size">Business Size *</Label>
          <Select value={company.businessSize} onValueChange={(value) => updateCompany({ businessSize: value })}>
            <SelectTrigger id="business-size">
              <SelectValue placeholder="Select business size" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_SIZES.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employees">Number of Employees *</Label>
          <Input
            id="employees"
            type="number"
            min="1"
            value={company.employees || ""}
            onChange={(e) => updateCompany({ employees: Number.parseInt(e.target.value) || 0 })}
            placeholder="e.g., 50"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Data Sources *</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Select all data sources you currently use or plan to integrate
        </p>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {DATA_SOURCES.map((source) => (
            <div key={source} className="flex items-center space-x-2">
              <Checkbox
                id={`source-${source}`}
                checked={company.dataSources.includes(source)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateCompany({
                      dataSources: [...company.dataSources, source],
                    })
                  } else {
                    updateCompany({
                      dataSources: company.dataSources.filter((s) => s !== source),
                    })
                  }
                }}
              />
              <Label htmlFor={`source-${source}`} className="text-sm font-normal cursor-pointer">
                {source}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-medium text-foreground">Additional Requirements</h3>

        <div className="space-y-3">
          <div className="flex items-start justify-between p-4 rounded-lg border bg-muted/30">
            <div className="space-y-1">
              <div className="font-medium">On-Premise Installation</div>
              <p className="text-sm text-muted-foreground">Deploy the dashboard on your own infrastructure</p>
            </div>
            <Badge className="bg-[#03045E] text-white hover:bg-[#03045E]/90">Included • Mandatory</Badge>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="data-migration"
              checked={company.dataMigrationNeeded}
              onCheckedChange={(checked) => updateCompany({ dataMigrationNeeded: checked as boolean })}
            />
            <div className="space-y-1">
              <Label htmlFor="data-migration" className="cursor-pointer font-medium">
                Existing Data Migration Needed
              </Label>
              <p className="text-sm text-muted-foreground">Migrate historical data from legacy systems</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={company.notes}
          onChange={(e) => updateCompany({ notes: e.target.value })}
          placeholder="Any specific requirements, integrations, or details we should know about..."
          rows={4}
        />
      </div>
    </div>
  )
}
