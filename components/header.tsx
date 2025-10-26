import Image from "next/image"
import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Image src="/logo-oorik.png" alt="oorIk" width={32} height={32} className="h-8 w-8" />
          <div>
            <h1 className="text-lg font-semibold text-foreground">BI Dashboard Simulator</h1>
            <p className="text-xs text-muted-foreground">Configure your custom solution</p>
          </div>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="rounded-full p-2 hover:bg-accent">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">Help</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-sm">
                Configure your ideal BI dashboard by selecting KPIs, visualizations, and features. We'll provide a
                personalized quote based on your selections.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  )
}
