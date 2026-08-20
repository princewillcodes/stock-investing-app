"use client";

import { useState } from "react";
import { Bell, ChevronDown, Home, LineChart, Newspaper, Search, Settings, Star, Wallet } from "lucide-react";

const stock = { ticker: "NVDA", company: "NVIDIA Corporation", exchange: "NASDAQ", price: 1254.32, change: 18.72, pct: 1.51 };
const points = "M0 218 L40 198 L80 208 L120 170 L160 190 L200 148 L240 158 L280 130 L320 144 L360 110 L400 124 L440 92 L480 104 L520 70 L560 83 L600 55 L640 69 L680 42 L720 58 L760 34 L800 46 L840 25 L900 16";

export default function Home() {
  const [watching, setWatching] = useState(false);
  const [search, setSearch] = useState("");
  return <main className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">N</span><span>northstar</span></div>
      <nav className="nav">
        <a className="nav-item active"><Home size={18}/>Overview</a><a className="nav-item"><Search size={18}/>Discover</a><a className="nav-item"><Wallet size={18}/>Portfolio</a><a className="nav-item"><Newspaper size={18}/>News</a>
      </nav>
      <div className="sidebar-bottom"><a className="nav-item"><Settings size={18}/>Settings</a><div className="profile"><div className="avatar">WS</div><div><strong>Investor</strong><span>Personal account</span></div></div></div>
    </aside>
    <section className="content">
      <header className="topbar"><div className="search-wrap"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search companies, tickers..."/><kbd>⌘ K</kbd></div><div className="top-actions"><button className="icon-button"><Bell size={17}/></button><button className="market-pill"><i/>Markets open<ChevronDown size={14}/></button></div></header>
      <div className="page">
        <div className="breadcrumb">Discover <span>/</span> Stocks <span>/</span> NVIDIA</div>
        <div className="stock-heading"><div className="stock-identity"><div className="stock-logo">N</div><div><div className="eyebrow">{stock.ticker} · {stock.exchange}</div><h1>{stock.company}</h1></div></div><button className={`watch-button ${watching?"watching":""}`} onClick={()=>setWatching(!watching)}><Star size={16} fill={watching?"currentColor":"none"}/>{watching?"Watching":"Watch"}</button></div>
        <div className="price-row"><div><div className="price">${stock.price.toLocaleString()}</div><div className="gain">▲ ${stock.change} ({stock.pct}%) today</div></div><div className="time-tabs">{["1D","1W","1M","3M","1Y","5Y"].map((x,i)=><button className={i===0?"selected":""} key={x}>{x}</button>)}</div></div>
        <section className="chart-card"><div className="chart-toolbar"><span>Price performance</span><button>Compare <ChevronDown size={13}/></button></div><svg className="chart" viewBox="0 0 900 270" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#9cff32" stopOpacity=".18"/><stop offset="100%" stopColor="#9cff32" stopOpacity="0"/></linearGradient></defs><path d={`${points} L900 245 L0 245 Z`} fill="url(#fill)"/><path d={points} fill="none" stroke="#9cff32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg><div className="chart-labels"><span>09:30</span><span>12:00</span><span>14:30</span><span>16:00</span></div></section>
        <div className="metrics">{[["Market cap","$3.10T"],["P/E ratio","66.42"],["Dividend yield","0.03%"],["52 week range","262.20 — 1,277.50"]].map(([a,b])=><div className="metric" key={a}><span>{a}</span><strong>{b}</strong></div>)}</div>
        <div className="lower-grid"><section className="panel"><div className="panel-heading"><div><h2>Latest news</h2><span>What’s moving the stock</span></div><button className="text-button">View all</button></div>{[["Reuters","NVIDIA hits new all-time high driven by AI chip demand","1h ago"],["The Verge","NVIDIA’s next-gen chips power the AI revolution","3h ago"],["CNBC","Chip stocks rally as investors look ahead to earnings","5h ago"]].map(([s,h,t])=><article className="news-row" key={h}><div className="news-icon"><Newspaper size={16}/></div><div className="news-copy"><span>{s} · {t}</span><strong>{h}</strong></div><ChevronDown size={15} className="news-arrow"/></article>)}</section><section className="panel"><div className="panel-heading"><div><h2>Research snapshot</h2><span>Fundamentals at a glance</span></div><LineChart size={17}/></div><div className="research">{[["Revenue growth","+18.6%"],["Gross margin","75.0%"],["Analyst sentiment","Bullish"],["Next earnings","Aug 27"]].map(([a,b])=><div key={a}><span>{a}</span><strong className={b==="Bullish"||b.startsWith("+")?"positive":""}>{b}</strong></div>)}</div></section></div>
      </div>
    </section>
  </main>;
}
