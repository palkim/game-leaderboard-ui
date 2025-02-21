import React from "react";

interface TableRowProps {
  rank: number;
  name: string;
  country: string | undefined;
  money: number;
  order: string[];
}

const TableRow: React.FC<TableRowProps> = ({ rank, name, country, money, order }) => {
  return (
    <div className="flex items-center justify-between bg-[#332a65] p-[0.5] w-full rounded-sm h-11 [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)]">
      <div className="flex items-center justify-between bg-[#241e3e] text-gray-300 p-4 w-full rounded-sm h-10 [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)]">
        {order.map((key) => (
          <span
            key={key}
            className={`p-3 ${key === "Money" ? "text-[#6f5ec3]" : "text-white"} font-bold w-64 text-start`}
          >
            {key === "Ranking" ? rank : key === "Player Name" ? name : key === "Country" ? country : money}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TableRow;
