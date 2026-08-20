"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronRight, Flame, Search } from "lucide-react";
import { StockSearch } from "@/components/stock-search";

const stocks = [
  ["NVDA", "NVIDIA Corporation", "181.74", "+1.75%"], ["MSFT", "Microsoft Corporation", "512.63", "+0.47%"], ["AAPL", "Apple Inc.", "229.98", "-0.32%"], ["AMZN", "Amazon.com, Inc.", "238.16", "+0.46%"], ["GOOGL", "Alphabet Inc.", "205.32", "+0.82%"], ["TSLA", "Tesla, Inc.", "337.41", "-1.35%"]
];

export default function DiscoverPage() {
  return <main className="app-shell"><aside className="sidebar"><div className="brand"><span className="brand-mark">N</span><span>northstar</span></div><nav className="nav"><Link className="nav-item" href="/"><Search size={18}/>Overview</Link><Link className="nav-item active" href="/discover"><Flame size={18}/>Discover</Link><Link className="nav-item" href="/portfolio"><ArrowUpRight size={18}/>Portfolio</Link><Link className="nav-item" href="/news"><Search size={18}/>News</Link></nav></aside><section className="content"><header className="topbar"><StockSearch/></header><div className="page"><div className="section-title"><div><h1>Discover</h1><p>Find the companies worth paying attention to.</p></div></div><div className="route-grid"><section><div className="panel-heading"><div><h2>Popular stocks</h2><span>Large, liquid names investors are watching</span></div></div><div className="stock-list">{stocks.map(([ticker,name,price,change])=><Link href={`/stocks/${ticker}`} className="stock-card" key={ticker}><span className="mini-logo">{ticker.slice(0,1)}</span><span className="name"><strong>{name}</strong><span>{ticker} · NASDAQ</span></span><span className="exchange">Technology</span><span className="quote"><strong>${price}</strong><span className={change.startsWith("+")?"up":"down"}>{change}</span></span><ChevronRight size={15}/></Link>)}</div></section><aside className="panel"><div className="panel-heading"><div><h2>Market themes</h2><span>Ideas to research</span></div></div><div className="side-list">{[["AI infrastructure","Semiconductors"],["Cloud growth","Software"],["Consumer strength","Retail"],["Electric mobility","Automotive"]].map(([a,b])=><div className="side-row" key={a}><strong>{a}</strong><span>{b}</span></div>)}</div></aside></div></div></section></main>;
}
