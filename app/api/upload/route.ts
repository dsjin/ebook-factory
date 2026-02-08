import { NextResponse } from 'next/server'
import { getAdapter } from '@/lib/uploadAdapters'

const adapter = getAdapter()

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const files = form.getAll('files') as File[] | []
    const results: any[] = []

    for (const f of files) {
      const arrayBuffer = await f.arrayBuffer()
      const buf = Buffer.from(arrayBuffer)
      const uploaded = await adapter.upload(f.name, buf, (f as any).type)
      results.push(uploaded)
    }

    return NextResponse.json({ ok: true, adapter: process.env.UPLOAD_ADAPTER || (process.env.NODE_ENV === 'production' ? 'vercel' : 'local'), files: results })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 })
  }
}
