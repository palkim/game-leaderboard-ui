"use client";

import { Tooltip as ReactTooltip } from "react-tooltip";

import Flag from "react-world-flags";

interface TableRowProps {
  playerId: string;
  rank: number;
  name: string;
  country: string;
  money: number;
  countryCode: string;
  order: string[];
  isGrouped: boolean;
  isSearchResult: boolean;
}

const TableRow: React.FC<TableRowProps> = ({
  playerId,
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

  const getTextStyles = (key: string) => {
    if (key === "Money" || (isSearchResult && (key === "Ranking" || key === "Player Name"))) {
      return "text-[#6f5ec3] font-bold";
    }
    return "text-white";
  };

  return (
    <>
      <div
        className={`flex self-center items-center justify-between rounded-sm h-11 bg-[#332a65] p-[0.03125rem] 
        ${isGrouped ? "w-[97%]" : "w-full"} 
        [clip-path:polygon(2.5rem_0,100%_0,100%_calc(100%-1.25rem),calc(100%-2.5rem)_100%,0_100%,0_1.25rem)]`}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={`Player ID: ${playerId}`}
      >
        <div
          className={`flex items-center w-full rounded-sm h-10 p-5
        ${isSearchResult ? "bg-[#2a234d]" : "bg-[#241e3e]"}  
        [clip-path:polygon(2.5rem_0,100%_0,100%_calc(100%-1.25rem),calc(100%-2.5rem)_100%,0_100%,0_1.25rem)]`}
        >
          {order.map((key) => (
            <div
              key={key}
              className={`flex-1 flex items-center text-left pl-4 text-xs xs:text-sm sm:text-base md:text-base lg:text-base  
              ${getTextStyles(key)}`}
            >
              {key === "Country" && countryCode && !isGrouped ? (
                <div className="flex items-center gap-2 md:pl-4 lg:pl-4">
                  <Flag
                    code={countryCode}
                    className="max-[400px]:w-3 max-[400px]:h-3 min-[400px]:w-4 min-[400px]:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 rounded-full object-cover"
                  />
                  <span>{getDisplayValue(key)}</span>
                </div>
              ) : (
                <span className="text-xs sm:text-base text-left md:pl-4 lg:pl-4 w-full">{getDisplayValue(key)}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <ReactTooltip id="my-tooltip" place="right" />
    </>
  );
};

export default TableRow;
