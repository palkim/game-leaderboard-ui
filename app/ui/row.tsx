import React from "react";

interface TableRowProps {
  rank: number;
  name: string;
  country: string | undefined;
  money: number;
  order: string[];
  isGrouped: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ rank, name, country, money, order, isGrouped }) => {
  return (
    <div
      className={`flex self-center items-center justify-between bg-[#332a65] p-[0.03125rem] ${
        isGrouped ? "w-[95%]" : "w-full"
      } rounded-sm h-11 [clip-path:polygon(2.5rem_0,100%_0,100%_calc(100%-1.25rem),calc(100%-2.5rem)_100%,0_100%,0_1.25rem)]`}
    >
      <div className="flex items-center justify-between bg-[#241e3e] text-gray-300 p-4 w-full rounded-sm h-10 [clip-path:polygon(2.5rem_0,100%_0,100%_calc(100%-1.25rem),calc(100%-2.5rem)_100%,0_100%,0_1.25rem)]">
        {order.map((key) => (
          <span
            key={key}
            className={`p-3 ml-5 ${key === "Money" ? "text-[#6f5ec3]" : "text-white"} font-bold w-full text-start`}
          >
            {key === "Ranking" ? rank : key === "Player Name" ? name : key === "Country" ? country : money}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TableRow;
