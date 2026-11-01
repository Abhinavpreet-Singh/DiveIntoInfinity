import { NextResponse } from "next/server";

export interface ContactRequestBody {
  name: string;
  email: string;
  company?: string;
  websiteType: string;
  budget?: string;
  message: string;
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

    if (!body.message || body.message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a brief description of your project (minimum 10 characters)." },
        { status: 400 }
      );
    }

    // Check if an external email service (e.g., Resend, SendGrid, or custom webhook) is configured via environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || "hello@diveintoinfinity.com";
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

    // Log enquiry details in development or server logs
    console.info("[Contact API] Valid enquiry received:", {
      name: body.name,
      email: body.email,
      company: body.company || "N/A",
      websiteType: body.websiteType,
      budget: body.budget || "N/A",
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
            source: "DiveintoInfinity Studio Form",
            receivedAt: new Date().toISOString(),
          }),
        });
      } catch (webhookError) {
        console.error("[Contact API Webhook Error]:", webhookError);
        // Continue to return success to client if primary capture succeeds
      }
    }

    // If Resend API Key is configured, send actual notification email
    if (resendApiKey) {
      try {
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
            subject: `New Project Enquiry: ${body.name} (${body.websiteType})`,
            text: `
Name: ${body.name}
Email: ${body.email}
Company: ${body.company || "Not provided"}
Website Type: ${body.websiteType}
Budget: ${body.budget || "Not provided"}

Project Description:
${body.message}
            `.trim(),
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
      message: "Thank you for reaching out. We have received your inquiry and will review it carefully within 24 to 48 hours.",
      receivedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Contact API Exception]:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred while processing your request. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
