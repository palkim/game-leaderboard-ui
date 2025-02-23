"use client";

import { Dispatch, SetStateAction } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
  placeholder,
  setQuery,
}: Readonly<{
  placeholder: string;
  setQuery: Dispatch<SetStateAction<string | undefined>>;
}>) {
  const handleSearch = useDebouncedCallback((term: string) => {
    setQuery(term);
  }, 300);

  return (
    <div className="relative flex flex-1 h-8 w-full shadow-md ">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        className="w-full py-[9px] pl-10 outline-2 bg-[#241e3e] border border-[#332a65] rounded-md text-white"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder={placeholder}
      />
      <FaSearch
        style={{ color: "#ffff" }}
        className="absolute left-3 top-1/2 h-4 -translate-y-1/2 peer-focus:text-gray-900"
      />
    </div>
  );
}
