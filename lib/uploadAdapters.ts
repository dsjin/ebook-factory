import fs from 'fs/promises'
import os from 'os'
import path from 'path'

export type UploadResultType = {
  name: string
  originalFileName: string
  stored: 'local' | 'vercel'
  path?: string
  remote?: any
}

export interface UploadAdapter {
  upload(fileName: string, buffer: Buffer, contentType?: string): Promise<any>
}

export class LocalAdapter implements UploadAdapter {
  private base: string

  constructor(baseDir?: string) {
    this.base = baseDir || path.join(os.tmpdir(), 'ebook-factory-uploads')
  }

  async upload(fileName: string, buffer: Buffer): Promise<UploadResultType> {
    await fs.mkdir(this.base, { recursive: true })
    const name = `${Date.now()}-${fileName}`
    const outPath = path.join(this.base, name)
    await fs.writeFile(outPath, buffer)
    return { stored: 'local', name, originalFileName: fileName, path: outPath }
  }
}

export class VercelBlobAdapter implements UploadAdapter {
  private endpoint?: string
  private token?: string

  constructor(endpoint?: string, token?: string) {
    this.endpoint = endpoint || process.env.VERCEL_BLOB_ENDPOINT
    this.token = token || process.env.VERCEL_BLOB_TOKEN
  }

  async upload(fileName: string, buffer: Buffer, contentType?: string) {
    // TODO: VercelBlobAdapter
    // if (!this.endpoint || !this.token) {
    //   throw new Error('Vercel blob endpoint/token not configured')
    // }

    // const res = await fetch(this.endpoint, {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${this.token}`,
    //     'Content-Type': contentType || 'application/octet-stream',
    //     'X-Filename': fileName,
    //   },
    //   body: new Uint8Array(buffer),
    // })

    // if (!res.ok) {
    //   const txt = await res.text().catch(() => '')
    //   throw new Error(`Vercel upload failed: ${res.status} ${txt}`)
    // }

    // return await res.json().catch(() => ({ ok: true }))
  }
}

export function getAdapter(): UploadAdapter {
  const forced = process.env.UPLOAD_ADAPTER
  const adapter = forced || (process.env.NODE_ENV === 'production' ? 'vercel' : 'local')

  if (adapter === 'local') return new LocalAdapter()
  if (adapter === 'vercel') return new VercelBlobAdapter()
  return new LocalAdapter()
}
