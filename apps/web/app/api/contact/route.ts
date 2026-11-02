import { NextResponse } from "next/server";

export interface ContactRequestBody {
  name: string;
  email: string;
  company?: string;
  role?: string;
  phone?: string;
  preferredContact?: string;
  websiteType?: string;
  projectName?: string;
  projectStage?: string;
  targetAudience?: string;
  industry?: string;
  platforms?: string[];
  features?: string[];
  designStatus?: string;
  techStack?: string;
  referenceLinks?: string;
  assetLinks?: string;
  timeline?: string;
  budget?: string;
  message?: string;
  additionalNotes?: string;
  source?: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();

    // Validation
    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!body.email || !emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const desc = body.message || body.projectName || "";
    if (desc.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a description or title of your project." },
        { status: 400 }
      );
    }

    // Check if an external email service is configured via environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || "hello@diveintoinfinity.com";
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

    // Log enquiry details in server logs
    console.info("[Contact API] Valid enquiry / project brief received:", {
      name: body.name,
      email: body.email,
      company: body.company || "N/A",
      role: body.role || "N/A",
      projectName: body.projectName || "N/A",
      websiteType: body.websiteType || "N/A",
      platforms: body.platforms || [],
      timeline: body.timeline || "N/A",
      budget: body.budget || "N/A",
      source: body.source || "Website Form",
      timestamp: new Date().toISOString(),
    });

    // If a webhook is provided, forward the enquiry payload
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...body,
            receivedAt: new Date().toISOString(),
          }),
        });
      } catch (webhookError) {
        console.error("[Contact API Webhook Error]:", webhookError);
      }
    }

    // If Resend API Key is configured, send notification email
    if (resendApiKey) {
      try {
        const subjectTitle = body.projectName
          ? `New Project Brief: "${body.projectName}" by ${body.name}`
          : `New Project Enquiry: ${body.name} (${body.websiteType || "Studio"})`;

        const emailContent = `
=== DIVEINTOINFINITY INTAKE BRIEF ===

CONTACT DETAILS
------------------------------------
Name: ${body.name}
Email: ${body.email}
Company: ${body.company || "Not provided"}
Role: ${body.role || "Not provided"}
Phone / WhatsApp: ${body.phone || "Not provided"}
Preferred Contact: ${body.preferredContact || "Email"}

PROJECT OVERVIEW
------------------------------------
Project Name: ${body.projectName || "Untitled"}
Stage: ${body.projectStage || "Not specified"}
Industry: ${body.industry || "Not specified"}
Target Audience: ${body.targetAudience || "Not specified"}

TECHNICAL SCOPE & PLATFORMS
------------------------------------
Surfaces: ${body.platforms?.join(", ") || body.websiteType || "Not specified"}
Key Features: ${body.features?.join(", ") || "Standard"}
Design Status: ${body.designStatus || "Not specified"}
Tech Stack Preferences: ${body.techStack || "Studio choice"}

TIMELINE & BUDGET
------------------------------------
Timeline: ${body.timeline || "Flexible"}
Budget: ${body.budget || "Not provided"}

ASSETS & REFERENCES
------------------------------------
Asset Links (Figma/Drive): ${body.assetLinks || "None"}
Inspiration / Competitors: ${body.referenceLinks || "None"}

DESCRIPTION & NOTES
------------------------------------
${body.message || "No description"}

Source: ${body.source || "Website"}
Timestamp: ${new Date().toISOString()}
        `.trim();

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "DiveintoInfinity <onboarding@resend.dev>",
            to: recipientEmail,
            reply_to: body.email,
            subject: subjectTitle,
            text: emailContent,
          }),
        });

        if (!emailResponse.ok) {
          const errData = await emailResponse.json().catch(() => ({}));
          console.error("[Contact API Resend Error]:", errData);
        }
      } catch (resendError) {
        console.error("[Contact API Email Sending Error]:", resendError);
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you for sharing your project brief. We have received your specifications and will review them carefully within 24 to 48 hours.",
      receivedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Contact API Exception]:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected server error occurred while processing your request. Please try again or email us directly.",
      },
      { status: 500 }
    );
  }
}
