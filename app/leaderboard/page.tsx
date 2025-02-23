"use client";

import HeaderRow from "@ui/header-row";
import TableRow from "@ui/row";
import Search from "@ui/search";
import { Fragment, useCallback, useEffect, useState } from "react";
import { FaLayerGroup, FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

import dynamic from "next/dynamic";

const HeaderGroup = dynamic(() => import("@ui/header-group"), { ssr: false });

interface LeaderboardData {
  ranking: number;
  id: string;
  playerName: string;
  country: string;
  money: number;
  countryCode: string;
}

interface GroupedLeaderboardData {
  groupCountry: string;
  groupCountryCode: string;
  rows: LeaderboardData[];
}

interface SurroundingPlayersData {
  prevPlayers: LeaderboardData[];
  nextPlayers: LeaderboardData[];
}

interface SearchData {
  id: string;
  ranking: number;
  playerName: string;
  country: string;
  countryCode: string;
  money: number;
  surroundingPlayers?: SurroundingPlayersData;
}

const Leaderboard = () => {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [searchData, setSearchData] = useState<SearchData[] | null>(null);
  const [nonTop100Data, setNonTop100Data] = useState<SearchData[] | null>(null);
  const [data, setData] = useState<LeaderboardData[]>([]);
  const [groupedData, setGroupedData] = useState<GroupedLeaderboardData[]>([]);
  const [renderGroups, setRenderGroups] = useState<boolean>(false);
  const [items, setItems] = useState<string[]>(["Ranking", "Player Name", "Country", "Money"]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (query?: string) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        console.error("API URL is not defined");
        toast.error("API URL is not defined");
        return;
      }
      let url = `${apiUrl}/leaderboard/top-ranking-data`;
      if (query) {
        url += `?query=${query}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        toast.error("Network response was not ok");
        return;
      }
      const data = await response.json();
      setData(data.topRankingPlayers);
      setSearchData(data.searchResults ?? null);
      const nonTop100Data = data.searchResults?.filter((result: SearchData) => result.ranking > 100) ?? null;
      if (nonTop100Data) {
        toast.info("Search results found outside the top100 are displayed below the leaderboard");
      }
      setNonTop100Data(nonTop100Data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      toast.error("There was a problem with the fetch operation");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query) {
      fetchData(query);
    } else {
      fetchData();
    }
  }, [query, fetchData]);

  useEffect(() => {
    if (renderGroups) {
      const grouped = data.reduce<{ [key: string]: GroupedLeaderboardData }>((acc, item) => {
        const country = item.countryCode;
        if (!acc[country]) {
          acc[country] = { groupCountry: item.country, groupCountryCode: country, rows: [] };
        }
        acc[country].rows.push(item);
        return acc;
      }, {});

      const groupedDataArray = Object.values(grouped).map((group) => ({
        ...group,
        rows: group.rows
          .toSorted((a, b) => a.ranking - b.ranking)
          .map((item, index) => ({
            ...item,
            ranking: index + 1,
          })),
      }));

      setGroupedData(groupedDataArray);
    } else {
      setGroupedData([]);
    }
  }, [renderGroups, data]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center">
          <FaSpinner className="animate-spin text-white" />
        </div>
      );
    }

    if (!data.length) {
      return (
        <div className="flex items-center justify-center text-white">
          <span className="text-2xl font-bold">No data available</span>
        </div>
      );
    }

    if (renderGroups) {
      return groupedData.map((group) => (
        <Fragment key={group.groupCountry}>
          <HeaderRow header={group.groupCountry} flagCode={group.groupCountryCode} />
          {group.rows.map((item) => (
            <TableRow
              playerId={item.id}
              key={item.ranking}
              rank={item.ranking}
              name={item.playerName}
              country={item.country}
              countryCode={item.countryCode}
              money={item.money}
              order={items}
              isGrouped={true}
              isSearchResult={searchData ? searchData.some((searchItem) => searchItem.id === item.id) : false}
            />
          ))}
        </Fragment>
      ));
    } else {
      return (
        <>
          {data.map((item) => (
            <TableRow
              playerId={item.id}
              key={item.ranking}
              rank={item.ranking}
              name={item.playerName}
              country={item.country}
              countryCode={item.countryCode}
              money={item.money}
              order={items}
              isGrouped={false}
              isSearchResult={searchData ? searchData.some((searchItem) => searchItem.id === item.id) : false}
            />
          ))}
          {nonTop100Data && nonTop100Data.length > 0 && (
            <div className="mt-10 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">Search Results</span>
            </div>
          )}
          {nonTop100Data?.map((item: SearchData) => (
            <div key={item.ranking} className="flex flex-col gap-2">
              {/* Render previous players if available */}
              {item.surroundingPlayers?.prevPlayers && item.surroundingPlayers.prevPlayers.length > 0 && (
                <div className="flex flex-col gap-1">
                  {item.surroundingPlayers.prevPlayers
                    .filter((prevPlayer) => prevPlayer.ranking > 100)
                    .map((prevPlayer) => (
                      <TableRow
                        playerId={prevPlayer.id}
                        key={prevPlayer.ranking}
                        rank={prevPlayer.ranking}
                        name={prevPlayer.playerName}
                        country={prevPlayer.country}
                        countryCode={prevPlayer.countryCode}
                        money={prevPlayer.money}
                        order={items}
                        isGrouped={false}
                        isSearchResult={false}
                      />
                    ))}
                </div>
              )}
              {/* Render current player */}
              <TableRow
                playerId={item.id}
                rank={item.ranking}
                name={item.playerName}
                country={item.country}
                countryCode={item.countryCode}
                money={item.money}
                order={items}
                isGrouped={false}
                isSearchResult={searchData ? searchData.some((searchItem) => searchItem.id === item.id) : false}
              />
              {/* Render next players if available */}
              {item.surroundingPlayers?.nextPlayers && item.surroundingPlayers.nextPlayers.length > 0 && (
                <div className="flex flex-col gap-1">
                  {item.surroundingPlayers.nextPlayers.map((nextPlayer) => (
                    <TableRow
                      playerId={nextPlayer.id}
                      key={nextPlayer.ranking}
                      rank={nextPlayer.ranking}
                      name={nextPlayer.playerName}
                      country={nextPlayer.country}
                      countryCode={nextPlayer.countryCode}
                      money={nextPlayer.money}
                      order={items}
                      isGrouped={false}
                      isSearchResult={false}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <div className="w-[90%] xs:w-[90%] sm:w-[90%] md:w-[80%] lg:w-[70%] h-full overflow-y-auto">
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
        {renderContent()}
      </div>
      <br />
    </div>
  );
};

export default Leaderboard;
