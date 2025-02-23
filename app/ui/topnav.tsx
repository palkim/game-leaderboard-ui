import Link from "next/link";
import { FaHome, FaSun } from "react-icons/fa";

const TopNav = () => {
  return (
    <div className="flex justify-between items-center bg-[#17151e] p-3">
      <Link
        href="/"
        className="w-10 h-10 flex items-center justify-center rounded-md bg-black bg-opacity-20 hover:bg-opacity-30 transition border border-gray-700"
      >
        <FaHome className="w-5 h-5 text-gray-400" />
      </Link>
      <div className="flex-1 text-center text-white text-[1.5rem] font-bold">PANTEON</div>
      <button className="w-10 h-10 flex items-center justify-center rounded-md bg-black bg-opacity-20 hover:bg-opacity-30 transition border border-gray-700">
        <FaSun className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );
};

export default TopNav;
