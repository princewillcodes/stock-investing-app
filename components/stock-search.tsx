"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function StockSearch() {
  const [term, setTerm] = useState("");
  const results = useQuery(api.stocks.search, process.env.NEXT_PUBLIC_CONVEX_URL && term.trim() ? { searchTerm: term } : "skip");
  return <div className="global-search"><Search size={17}/><input value={term} onChange={e => setTerm(e.target.value)} placeholder="Search companies, tickers..."/><kbd>⌘ K</kbd>{term && results?.length ? <div className="search-results">{results.map((stock: any) => <Link key={stock._id} href={`/stocks/${stock.ticker}`} onClick={() => setTerm("")}><span className="mini-logo">{stock.ticker.slice(0,1)}</span><span><strong>{stock.ticker}</strong><small>{stock.companyName}</small></span><em>${stock.price?.toFixed(2) ?? "—"}</em></Link>)}</div> : null}</div>;
}
