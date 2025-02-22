import React, { Fragment } from "react";
import Flag from "react-world-flags";

interface TableRowProps {
  rank: number;
  name: string;
  country: string | undefined;
  money: number;
  countryCode?: string;
  order: string[];
  isGrouped: boolean;
  isSearchResult: boolean;
}

const TableRow: React.FC<TableRowProps> = ({
  rank,
  name,
  country,
  money,
  countryCode,
  order,
  isGrouped,
  isSearchResult,
}) => {
  const getDisplayValue = (key: string) => {
    if (key === "Ranking") return rank;
    if (key === "Player Name") return name;
    if (key === "Country" && !isGrouped) return country;
    if (key === "Country" && isGrouped) return " ";
    return Math.ceil(money * 100) / 100;
  };

  return (
    <div
      className={`flex self-center items-center justify-between rounded-sm h-11 bg-[#332a65] p-[0.03125rem] 
        ${isGrouped ? "w-[97%]" : "w-full"} 
        [clip-path:polygon(2.5rem_0,100%_0,100%_calc(100%-1.25rem),calc(100%-2.5rem)_100%,0_100%,0_1.25rem)]`}
    >
      <div
        className={`flex items-center justify-between text-gray-300 p-4 w-full rounded-sm h-10
        ${isSearchResult ? "bg-[#2a234d]" : "bg-[#241e3e]"}  
        [clip-path:polygon(2.5rem_0,100%_0,100%_calc(100%-1.25rem),calc(100%-2.5rem)_100%,0_100%,0_1.25rem)]`}
      >
        {order.map((key) => (
          <Fragment key={key}>
            {key === "Country" && countryCode && (
              <Flag code={countryCode} className="w-6 h-6 rounded-full object-cover ml-5" />
            )}
            <span
              className={`p-3 font-bold w-full text-start
                ${key === "Money" ? "text-[#6f5ec3]" : "text-white"} 
                ${key !== "Country" ? "ml-5" : ""}  
                ${isSearchResult ? "!text-[#6f5ec3]" : "text-white"}`}
            >
              {getDisplayValue(key)}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default TableRow;
