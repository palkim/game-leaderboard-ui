"use client";

import { toast } from "sonner";

export default function Home() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const country = formData.get("country") as string;
    const countryCode = formData.get("countryCode") as string;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("API URL is not defined");
      toast.error("API URL is not defined");
      return;
    }
    const response = await fetch(`${apiUrl}/player/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        country,
        countryCode,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.error);
      return;
    }
    toast.success(`Player created successfully: ${name}`);
  };

  const handleSubmitEarn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const playerId = formData.get("playerId") as string;
    const amount = formData.get("amount") as string;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("API URL is not defined");
      toast.error("API URL is not defined");
      return;
    }
    const response = await fetch(`${apiUrl}/leaderboard/earn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerId,
        amount,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.error);
      return;
    }
    toast.success(`Player with ID ${playerId} earned ${amount} money`);
  };

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)] w-full">
      <main className="flex justify-between items-start w-full">
        <div className="flex-1 items-left">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/2 p-8">
            <label htmlFor="name" className="text-white">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="bg-[#241e3e] border border-[#332a65] rounded-md text-white p-2"
            />
            <label htmlFor="country" className="text-white">
              Country:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              required
              className="bg-[#241e3e] border border-[#332a65] rounded-md text-white p-2"
            />
            <label htmlFor="countryCode" className="text-white">
              Country Code:
            </label>
            <input
              type="text"
              id="countryCode"
              name="countryCode"
              required
              className="bg-[#241e3e] border border-[#332a65] rounded-md text-white p-2"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Player
            </button>
          </form>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center h-full">
          <a href="/leaderboard" className="text-blue-500 hover:text-blue-700 text-center p-20">
            View Leaderboard
          </a>
        </div>
        <div className="flex-1 items-center justify-center h-full">
          <form onSubmit={handleSubmitEarn} className="flex flex-col gap-4 w-1/2 p-8">
            <label htmlFor="playerId" className="text-white">
              Player ID:
            </label>
            <input
              type="text"
              id="playerId"
              name="playerId"
              required
              className="bg-[#241e3e] border border-[#332a65] rounded-md text-white p-2"
            />
            <label htmlFor="amount" className="text-white">
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              className="bg-[#241e3e] border border-[#332a65] rounded-md text-white p-2"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Earn Money
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
