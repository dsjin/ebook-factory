"use client"

import React, { useCallback, useState } from "react"

type Props = {
  onUpload?: (files: File[]) => Promise<void> | void
}

export default function DragDropUpload({ onUpload }: Props) {
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const handleFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return
    const list = Array.from(incoming)
    setFiles((prev) => [...prev, ...list])
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }, [])

  const onDragLeave = useCallback(() => setDragging(false), [])

  const onFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
    e.currentTarget.value = ""
  }, [handleFiles])

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const upload = useCallback(async () => {
    if (files.length === 0) return
    try {
      await onUpload?.(files) // user provided handler
      // simple success clearing
      setFiles([])
      alert('Uploaded ' + files.length + ' file(s)')
    } catch (err) {
      console.error(err)
      alert('Upload failed')
    }
  }, [files, onUpload])

  return (
    <div className="mt-6">
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`border-2 rounded-lg p-6 text-center transition-colors ${dragging ? 'border-sky-600 bg-sky-50' : 'border-dashed border-gray-300'}`}
      >
        <input type="file" id="file" multiple className="hidden" onChange={onFileInput} />
        <label htmlFor="file" className="cursor-pointer">
          <div className="text-lg font-medium">Drag & drop files here or click to select</div>
          <div className="text-sm text-gray-500 mt-2">Supports multiple files</div>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Files</h3>
          <ul className="space-y-2">
            {files.map((f, i) => (
              <li key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div className="text-sm">{f.name}</div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-500">{Math.round(f.size / 1024)} KB</div>
                  <button onClick={() => removeFile(i)} className="text-red-500 text-xs">Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2">
            <button onClick={upload} className="px-4 py-2 bg-sky-600 text-white rounded">Upload</button>
            <button onClick={() => setFiles([])} className="px-4 py-2 border rounded">Clear</button>
          </div>
        </div>
      )}
    </div>
  )
}
