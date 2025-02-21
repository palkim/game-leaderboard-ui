import React from "react";
import Flag from "react-world-flags";
interface TableRowProps {
  header: string;
  flagCode: string;
}

const HeaderRow: React.FC<TableRowProps> = ({ header, flagCode }) => {
  return (
    <div className="flex items-center justify-center bg-[#342b69] p-[0.03125rem] w-full rounded-sm h-11 [clip-path:polygon(2.5rem_0,100%_0,100%_calc(100%-1.25rem),calc(100%-2.5rem)_100%,0_100%,0_1.25rem)]">
      <div className="flex items-center justify-center bg-[#2b2156] text-gray-300 p-4 w-full rounded-sm h-10 [clip-path:polygon(2.5rem_0,100%_0,100%_calc(100%-1.25rem),calc(100%-2.5rem)_100%,0_100%,0_1.25rem)]">
        <div className="flex items-center justify-center">
          <Flag code={flagCode} className="w-6 h-6 rounded-full object-cover" />
          <span className={`text-white font-bold ml-2`}>{header}</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderRow;
