"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-2 rounded-2xl shadow-sm">
          <CardHeader className="text-center space-y-6 pt-12 pb-6">
            <div className="flex justify-center">
              <Image src="/logo-oorik.png" alt="oorIk Logo" width={120} height={40} className="h-10 w-auto" />
            </div>
            <div className="space-y-3">
              <CardTitle className="text-3xl font-bold text-foreground">oorIk BI Dashboard Simulator</CardTitle>
              <CardDescription className="text-base leading-relaxed max-w-lg mx-auto">
                Build a tailored, on-premise BI dashboard. No pricing shown; we quote after consultation.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pb-12 pt-6">
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-[#03045E] hover:bg-[#03045E]/90 text-white px-8 py-6 text-lg transition-all hover:scale-105 hover:shadow-md"
                onClick={() => router.push("/wizard")}
              >
                Start
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <footer className="text-center mt-8 text-sm text-muted-foreground">© oorIk Technologies</footer>
      </motion.div>
    </div>
  )
}
