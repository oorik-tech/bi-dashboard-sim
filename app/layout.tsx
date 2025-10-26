import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SimulatorProvider } from "@/lib/simulator-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "oorIk BI Dashboard Simulator",
  description: "Configure your custom Business Intelligence dashboard solution",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SimulatorProvider>{children}</SimulatorProvider>
      </body>
    </html>
  )
}
