"use client";

import { UploadResultType } from "@/lib/uploadAdapters";

export function UploadResult({ result }: { result: UploadResultType[] }) {
  if (!result) return null

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Files</h3>
      <ul className="space-y-2">
        {result.map((f, i) => (
          <li key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded">
            <div className="text-sm">{f.originalFileName}</div>
            <div className="flex items-center gap-2">
              {/* <div className="text-xs text-gray-500">{Math.round(f.size / 1024)} KB</div> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
} 
