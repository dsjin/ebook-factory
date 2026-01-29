// import Image from "next/image";

export default function Home() {
  return (
    <div className="page-content p-10">
      <div className="p-10 bg-sky-100 rounded-lg">
        <h1 className="text-4xl font-bold">Welcome! 🎉</h1>
        <p className="mt-4">This is your one-stop solution for all your eBook needs.</p>
        <p className="mt-4">Get started by exploring our features or uploading your own eBooks!</p>
        <div className="flex gap-3 mt-5">
          <button className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 cursor-pointer">
            Get Started
          </button>
          <button className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 cursor-pointer">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
