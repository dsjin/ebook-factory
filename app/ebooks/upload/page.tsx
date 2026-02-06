import Breadcrumb from '@/components/Breadcrumb'
import UploadClient from '@/components/UploadClient'

export default function Upload() {
  return (
    <div className="page-content p-10">
      <Breadcrumb />
      <h1 className="text-4xl font-bold">Upload Ebook</h1>
      <p className="mt-4">Here you can upload your ebook files.</p>

      <UploadClient />
    </div>
  )
}
