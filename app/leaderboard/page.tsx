"use client";

import HeaderGroup from "@ui/header-group";
import Search from "@ui/search";
import { useEffect, useState } from "react";
import TableRow from "../ui/row";

interface LeaderboardData {
  ranking: number;
  playerName: string;
  country?: string;
  money: number;
}

interface GroupedLeaderboardData {
  groupName: string;
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
      { ranking: 1, playerName: "JohnDoe", country: "Japan", money: 500 },
      { ranking: 2, playerName: "JohnDoe", country: "Sweden", money: 750 },
      { ranking: 3, playerName: "JohnDoe", country: "U.S.A", money: 1000 },
      { ranking: 4, playerName: "JohnDoe", country: "Turkey", money: 10 },
      { ranking: 5, playerName: "JohnDoe", country: "Bulgaria", money: 40 },
      { ranking: 6, playerName: "JohnDoe", country: "Greece", money: 2000 },
      { ranking: 7, playerName: "JohnDoe", country: "France", money: 4000 },
      { ranking: 8, playerName: "JohnDoe", country: "Finland", money: 250 },
      { ranking: 9, playerName: "JohnDoe", country: "Spain", money: 640 },
      { ranking: 10, playerName: "JohnDoe", country: "Germany", money: 800 },
      { ranking: 11, playerName: "JohnDoe", country: "Australia", money: 500 },
      { ranking: 12, playerName: "JohnDoe", country: "Sweden", money: 750 },
      { ranking: 13, playerName: "JohnDoe", country: "U.S.A", money: 1000 },
      { ranking: 14, playerName: "JohnDoe", country: "Turkey", money: 10 },
      { ranking: 15, playerName: "JohnDoe", country: "Bulgaria", money: 40 },
      { ranking: 16, playerName: "JohnDoe", country: "Greece", money: 2000 },
      { ranking: 17, playerName: "JohnDoe", country: "France", money: 4000 },
      { ranking: 18, playerName: "JohnDoe", country: "Finland", money: 250 },
      { ranking: 19, playerName: "JohnDoe", country: "Spain", money: 640 },
      { ranking: 20, playerName: "JohnDoe", country: "Germany", money: 800 },
    ];
    setData(data);
    const groupedData: GroupedLeaderboardData[] = [
      {
        groupName: "Japan",
        rows: [{ ranking: 1, playerName: "JohnDoe", money: 500 }],
      },
      {
        groupName: "Sweden",
        rows: [
          { ranking: 2, playerName: "JohnDoe", money: 750 },
          { ranking: 12, playerName: "JohnDoe", money: 750 },
        ],
      },
      {
        groupName: "U.S.A",
        rows: [
          { ranking: 3, playerName: "JohnDoe", money: 1000 },
          { ranking: 13, playerName: "JohnDoe", money: 1000 },
        ],
      },
      {
        groupName: "Turkey",
        rows: [
          { ranking: 4, playerName: "JohnDoe", money: 10 },
          { ranking: 14, playerName: "JohnDoe", money: 10 },
        ],
      },
      {
        groupName: "Bulgaria",
        rows: [
          { ranking: 5, playerName: "JohnDoe", money: 40 },
          { ranking: 15, playerName: "JohnDoe", money: 40 },
        ],
      },
      {
        groupName: "Greece",
        rows: [
          { ranking: 6, playerName: "JohnDoe", money: 2000 },
          { ranking: 16, playerName: "JohnDoe", money: 2000 },
        ],
      },
      {
        groupName: "France",
        rows: [
          { ranking: 7, playerName: "JohnDoe", money: 4000 },
          { ranking: 17, playerName: "JohnDoe", money: 4000 },
        ],
      },
      {
        groupName: "Finland",
        rows: [
          { ranking: 8, playerName: "JohnDoe", money: 250 },
          { ranking: 18, playerName: "JohnDoe", money: 250 },
        ],
      },
      {
        groupName: "Spain",
        rows: [
          { ranking: 9, playerName: "JohnDoe", money: 640 },
          { ranking: 19, playerName: "JohnDoe", money: 640 },
        ],
      },
      {
        groupName: "Germany",
        rows: [
          { ranking: 10, playerName: "JohnDoe", money: 800 },
          { ranking: 20, playerName: "JohnDoe", money: 800 },
        ],
      },
      {
        groupName: "Australia",
        rows: [{ ranking: 11, playerName: "JohnDoe", money: 500 }],
      },
    ];
    setGroupedData(groupedData);
  }, []);

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-2xl font-bold mb-4 mt-4 text-white">Leaderboard</div>
      <div className="flex flex-row gap-2 mb-4 ">
        <Search placeholder="Search" setQuery={setQuery} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setRenderGroups(!renderGroups)}>
          Group by country
        </button>
      </div>
      <div className="flex-1 flex flex-col gap-2 overflow-auto mb-10">
        <HeaderGroup items={items} setItems={setItems} />
        {renderGroups
          ? groupedData.map((group) => (
              <div key={group.groupName}>
                <div className="text-lg font-bold">{group.groupName}</div>
                {group.rows.map((item) => (
                  <TableRow
                    key={item.ranking}
                    rank={item.ranking}
                    name={item.playerName}
                    country={item.country}
                    money={item.money}
                    order={items}
                  />
                ))}
              </div>
            ))
          : data.map((item) => (
              <TableRow
                key={item.ranking}
                rank={item.ranking}
                name={item.playerName}
                country={item.country}
                money={item.money}
                order={items}
              />
            ))}
      </div>
    </div>
  );
};

export default Leaderboard;
