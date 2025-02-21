"use client";

import HeaderGroup from "@ui/header-group";
import Search from "@ui/search";
import { Fragment, useEffect, useState } from "react";
import { FaLayerGroup } from "react-icons/fa";
import HeaderRow from "../ui/header-row";
import TableRow from "../ui/row";

interface LeaderboardData {
  ranking: number;
  playerName: string;
  country?: string;
  money: number;
  countryCode?: string;
}

interface GroupedLeaderboardData {
  groupName: string;
  groupCountryFlag: string;
  rows: LeaderboardData[];
}

const Leaderboard = () => {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [data, setData] = useState<LeaderboardData[]>([]);
  const [groupedData, setGroupedData] = useState<GroupedLeaderboardData[]>([]);
  const [renderGroups, setRenderGroups] = useState<boolean>(false);
  const [items, setItems] = useState<string[]>(["Ranking", "Player Name", "Country", "Money"]);

  useEffect(() => {
    const data: LeaderboardData[] = [
      { ranking: 1, playerName: "JohnDoe", country: "Japan", countryCode: "JP", money: 500 },
      { ranking: 2, playerName: "JohnDoe", country: "Sweden", countryCode: "SE", money: 750 },
      { ranking: 3, playerName: "JohnDoe", country: "U.S.A", countryCode: "US", money: 1000 },
      { ranking: 4, playerName: "JohnDoe", country: "Turkey", countryCode: "TR", money: 10 },
      { ranking: 5, playerName: "JohnDoe", country: "Bulgaria", countryCode: "BG", money: 40 },
      { ranking: 6, playerName: "JohnDoe", country: "Greece", countryCode: "GR", money: 2000 },
      { ranking: 7, playerName: "JohnDoe", country: "France", countryCode: "FR", money: 4000 },
      { ranking: 8, playerName: "JohnDoe", country: "Finland", countryCode: "FI", money: 250 },
      { ranking: 9, playerName: "JohnDoe", country: "Spain", countryCode: "ES", money: 640 },
      { ranking: 10, playerName: "JohnDoe", country: "Germany", countryCode: "DE", money: 800 },
      { ranking: 11, playerName: "JohnDoe", country: "Australia", countryCode: "AU", money: 500 },
      { ranking: 12, playerName: "JohnDoe", country: "Sweden", countryCode: "SE", money: 750 },
      { ranking: 13, playerName: "JohnDoe", country: "U.S.A", countryCode: "US", money: 1000 },
      { ranking: 14, playerName: "JohnDoe", country: "Turkey", countryCode: "TR", money: 10 },
      { ranking: 15, playerName: "JohnDoe", country: "Bulgaria", countryCode: "BG", money: 40 },
      { ranking: 16, playerName: "JohnDoe", country: "Greece", countryCode: "GR", money: 2000 },
      { ranking: 17, playerName: "JohnDoe", country: "France", countryCode: "FR", money: 4000 },
      { ranking: 18, playerName: "JohnDoe", country: "Finland", countryCode: "FI", money: 250 },
      { ranking: 19, playerName: "JohnDoe", country: "Spain", countryCode: "ES", money: 640 },
      { ranking: 20, playerName: "JohnDoe", country: "Germany", countryCode: "DE", money: 800 },
    ];
    setData(data);
    const groupedData: GroupedLeaderboardData[] = [
      {
        groupName: "Japan",
        groupCountryFlag: "JP",
        rows: [{ ranking: 1, playerName: "JohnDoe", money: 500 }],
      },
      {
        groupName: "Sweden",
        groupCountryFlag: "SE",
        rows: [
          { ranking: 1, playerName: "JohnDoe", money: 750 },
          { ranking: 2, playerName: "JohnDoe", money: 750 },
        ],
      },
      {
        groupName: "U.S.A",
        groupCountryFlag: "US",
        rows: [
          { ranking: 1, playerName: "JohnDoe", money: 1000 },
          { ranking: 2, playerName: "JohnDoe", money: 1000 },
        ],
      },
      {
        groupName: "Turkey",
        groupCountryFlag: "TR",
        rows: [
          { ranking: 1, playerName: "JohnDoe", money: 10 },
          { ranking: 2, playerName: "JohnDoe", money: 10 },
        ],
      },
      {
        groupName: "Bulgaria",
        groupCountryFlag: "BG",
        rows: [
          { ranking: 1, playerName: "JohnDoe", money: 40 },
          { ranking: 2, playerName: "JohnDoe", money: 40 },
        ],
      },
      {
        groupName: "Greece",
        groupCountryFlag: "GR",
        rows: [
          { ranking: 1, playerName: "JohnDoe", money: 2000 },
          { ranking: 2, playerName: "JohnDoe", money: 2000 },
        ],
      },
      {
        groupName: "France",
        groupCountryFlag: "FR",
        rows: [
          { ranking: 1, playerName: "JohnDoe", money: 4000 },
          { ranking: 2, playerName: "JohnDoe", money: 4000 },
        ],
      },
      {
        groupName: "Finland",
        groupCountryFlag: "FI",
        rows: [
          { ranking: 1, playerName: "JohnDoe", money: 250 },
          { ranking: 2, playerName: "JohnDoe", money: 250 },
        ],
      },
      {
        groupName: "Spain",
        groupCountryFlag: "ES",
        rows: [
          { ranking: 1, playerName: "JohnDoe", money: 640 },
          { ranking: 2, playerName: "JohnDoe", money: 640 },
        ],
      },
      {
        groupName: "Germany",
        groupCountryFlag: "DE",
        rows: [
          { ranking: 1, playerName: "JohnDoe", money: 800 },
          { ranking: 2, playerName: "JohnDoe", money: 800 },
        ],
      },
      {
        groupName: "Australia",
        groupCountryFlag: "AU",
        rows: [{ ranking: 1, playerName: "JohnDoe", money: 500 }],
      },
    ];
    setGroupedData(groupedData);
  }, []);

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <div className="w-[70%] h-full">
      <div className="text-2xl font-bold mb-4 text-white text-center mt-10">Leaderboard</div>
      <div className="flex flex-row gap-2 mb-10 justify-between w-full">
        <Search placeholder="Search" setQuery={setQuery} />
        <button
          className="p-2 flex items-center justify-center rounded-md border border-[#3b3270] bg-[#241e3e] hover:border-[#6b5b95] transition"
          onClick={() => setRenderGroups(!renderGroups)}
        >
          <FaLayerGroup className="text-white" />
        </button>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <HeaderGroup items={items} setItems={setItems} />
        {renderGroups
          ? groupedData.map((group) => (
              <Fragment key={group.groupName}>
                <HeaderRow header={group.groupName} flagCode={group.groupCountryFlag} />
                {group.rows.map((item) => (
                  <TableRow
                    key={item.ranking}
                    rank={item.ranking}
                    name={item.playerName}
                    country={item.country}
                    money={item.money}
                    order={items}
                    isGrouped={true}
                  />
                ))}
              </Fragment>
            ))
          : data.map((item) => (
              <TableRow
                key={item.ranking}
                rank={item.ranking}
                name={item.playerName}
                country={item.country}
                money={item.money}
                order={items}
                isGrouped={false}
              />
            ))}
      </div>
      <br />
    </div>
  );
};

export default Leaderboard;
