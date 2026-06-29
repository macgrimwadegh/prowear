import { NextRequest, NextResponse } from 'next/server'
import type { QuoteCartItem } from '../../../lib/quote-types'
import { SIZES } from '../../../lib/quote-types'

interface SubmitQuoteBody {
  businessName: string
  contactName: string
  email: string
  phone?: string
  additionalNotes?: string
  items: QuoteCartItem[]
}

function buildEmailHtml(body: SubmitQuoteBody): string {
  const { businessName, contactName, email, phone, additionalNotes, items } = body

  const date = new Date().toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const itemRows = items
    .map((item) => {
      const sizeBreakdown = SIZES.filter((s) => item.quantities[s] > 0)
        .map((s) => `${s}: ${item.quantities[s]}`)
        .join(', ')

      return `
        <tr style="border-bottom: 1px solid #f0f0f0;">
          <td style="padding: 12px 8px; vertical-align: top;">
            ${item.productImage ? `<img src="${item.productImage}" alt="${item.productTitle}" style="width: 60px; height: 60px; object-fit: cover; display: block; margin-bottom: 6px;" />` : ''}
            <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${item.productTitle}</span>
          </td>
          <td style="padding: 12px 8px; vertical-align: top; font-size: 12px;">${item.selectedColor || '—'}</td>
          <td style="padding: 12px 8px; vertical-align: top; font-size: 12px;">${sizeBreakdown || '—'}</td>
          <td style="padding: 12px 8px; vertical-align: top; font-size: 12px; text-align: center;">${item.totalUnits}</td>
          <td style="padding: 12px 8px; vertical-align: top; font-size: 12px;">$${item.price.toFixed(2)}</td>
        </tr>
        ${item.notes ? `
        <tr style="border-bottom: 1px solid #f0f0f0; background: #fafafa;">
          <td colspan="5" style="padding: 6px 8px; font-size: 11px; color: #888; font-style: italic;">
            Notes: ${item.notes}
          </td>
        </tr>` : ''}
      `
    })
    .join('')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Prowear Quote Request</title>
</head>
<body style="margin: 0; padding: 0; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 40px auto; background: #ffffff; padding: 40px;">

    <!-- Header -->
    <div style="border-bottom: 2px solid #000; padding-bottom: 24px; margin-bottom: 32px;">
      <h1 style="font-size: 14px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 4px;">PROWEAR</h1>
      <h2 style="font-size: 11px; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: #666; margin: 0;">Quote Request</h2>
      <p style="font-size: 11px; color: #999; margin: 12px 0 0;">${date}</p>
    </div>

    <!-- Contact Info -->
    <div style="margin-bottom: 32px;">
      <h3 style="font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #999; margin: 0 0 16px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Contact Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; font-size: 11px; color: #999; width: 130px; text-transform: uppercase; letter-spacing: 0.08em;">Business</td>
          <td style="padding: 6px 0; font-size: 12px; font-weight: 600;">${businessName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.08em;">Contact</td>
          <td style="padding: 6px 0; font-size: 12px;">${contactName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.08em;">Email</td>
          <td style="padding: 6px 0; font-size: 12px;"><a href="mailto:${email}" style="color: #000;">${email}</a></td>
        </tr>
        ${phone ? `
        <tr>
          <td style="padding: 6px 0; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.08em;">Phone</td>
          <td style="padding: 6px 0; font-size: 12px;">${phone}</td>
        </tr>` : ''}
      </table>
    </div>

    <!-- Items -->
    <div style="margin-bottom: 32px;">
      <h3 style="font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #999; margin: 0 0 16px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Requested Items</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f8f8f8;">
            <th style="padding: 10px 8px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; text-align: left; color: #666;">Product</th>
            <th style="padding: 10px 8px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; text-align: left; color: #666;">Colour</th>
            <th style="padding: 10px 8px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; text-align: left; color: #666;">Sizes</th>
            <th style="padding: 10px 8px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; text-align: center; color: #666;">Units</th>
            <th style="padding: 10px 8px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; text-align: left; color: #666;">Unit Price (ex GST)</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
      </table>
    </div>

    <!-- Additional Notes -->
    ${additionalNotes ? `
    <div style="margin-bottom: 32px;">
      <h3 style="font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #999; margin: 0 0 16px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Additional Notes</h3>
      <p style="font-size: 12px; color: #444; line-height: 1.6; margin: 0;">${additionalNotes}</p>
    </div>` : ''}

    <!-- Footer -->
    <div style="border-top: 1px solid #eee; padding-top: 24px; margin-top: 32px;">
      <p style="font-size: 11px; color: #999; margin: 0; letter-spacing: 0.05em;">prowear.com.au</p>
      <p style="font-size: 10px; color: #ccc; margin: 6px 0 0;">This quote request was submitted via the Prowear website.</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

export async function POST(request: NextRequest) {
  try {
    const body: SubmitQuoteBody = await request.json()

    const { businessName, contactName, email, items } = body

    if (!businessName || !contactName || !email) {
      return NextResponse.json(
        { error: 'Business name, contact name, and email are required.' },
        { status: 400 }
      )
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in quote.' },
        { status: 400 }
      )
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 })
    }

    const htmlContent = buildEmailHtml(body)

    const emailPayload = {
      from: 'Prowear Quotes <quotes@prowear.com.au>',
      to: ['macgrimwade@prowear.com.au'],
      reply_to: email,
      subject: `Quote Request — ${businessName}`,
      html: htmlContent,
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(emailPayload),
    })

    if (!resendResponse.ok) {
      const errData = await resendResponse.text()
      console.error('Resend error:', errData)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit quote error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
