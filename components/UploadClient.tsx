"use client"

import React, { useState } from 'react'
import DragDropUpload from './DragDropUpload'
import { UploadResult } from './UploadResult'

export default function UploadClient() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)

  const onUpload = async (files: File[]) => {
    if (!files.length) return
    setLoading(true)
    const fd = new FormData()
    files.forEach((f) => fd.append('files', f))
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const json = await res.json()
      setResult(json)
    } catch (err) {
      console.error(err)
      setResult({ ok: false, error: String(err) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <DragDropUpload onUpload={onUpload} />
      {loading && <div className="mt-4">Uploading…</div>}
      {result && result.files && (
        <UploadResult result={result.files} />
      )}
    </div>
  )
}
