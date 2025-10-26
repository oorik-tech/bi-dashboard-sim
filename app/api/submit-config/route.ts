import { NextResponse } from "next/server"
import type { SimulatorConfig, ContactInfo } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { config, contact } = body as { config: SimulatorConfig; contact: ContactInfo }

    // Log the submission (in production, this would save to a database or send to a CRM)
    console.log("=== New BI Dashboard Configuration Submitted ===")
    console.log("Reference ID:", config.meta.refId)
    console.log("Company:", config.company.name)
    console.log("Contact:", contact.name, "-", contact.email)
    console.log("Configuration:", JSON.stringify(config, null, 2))
    console.log("================================================")

    // TODO: In production, implement:
    // 1. Save to database (e.g., Supabase, PostgreSQL)
    // 2. Send email notification to sales team
    // 3. Send confirmation email to customer
    // 4. Create CRM entry (e.g., Salesforce, HubSpot)
    // 5. Trigger workflow automation

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      refId: config.meta.refId,
      message: "Configuration received successfully. We'll contact you shortly.",
    })
  } catch (error) {
    console.error("Error processing configuration submission:", error)
    return NextResponse.json({ success: false, error: "Failed to process submission" }, { status: 500 })
  }
}
