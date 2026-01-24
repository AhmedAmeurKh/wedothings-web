import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { title, description, user } = await req.json()
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) return NextResponse.json({ error: 'Webhook URL not set' }, { status: 500 })

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: `New project uploaded by ${user}:\n**${title}**\n${description || ''}`
    })
  })

  return NextResponse.json({ ok: true })
}
