import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <nav className="w-full p-3 bg-sky-500 flex justify-center text-white">
        <div className="nav-content flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="h-fit">Book Factory</h1>
            <ul className="flex gap-3">
              <li className="px-3 py-2 bg-sky-700 hover:bg-sky-700 cursor-pointer transition-colors rounded-xl">
                Home
              </li>
              <li className="px-3 py-2 hover:bg-sky-700 cursor-pointer transition-colors rounded-xl">
                List
              </li>
              <li className="px-3 py-2 hover:bg-sky-700 cursor-pointer transition-colors rounded-xl">
                Upload
              </li>
            </ul>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-200 relative">
            <Image src="next.svg" fill alt="Profile Image"/>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
