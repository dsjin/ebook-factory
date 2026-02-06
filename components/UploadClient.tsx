"use client"

import React from 'react'
import DragDropUpload from './DragDropUpload'

export default function UploadClient() {
  return (
    <div>
      <DragDropUpload onUpload={async (files: File[]) => {
        // placeholder upload handler — replace with API call
        console.log('files to upload', files)
      }} />
    </div>
  )
}
