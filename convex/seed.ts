import { mutation } from "./_generated/server";

const stocks = [
  { ticker: "NVDA", companyName: "NVIDIA Corporation", exchange: "NASDAQ", sector: "Technology", industry: "Semiconductors", currency: "USD", description: "Designs GPUs and accelerated computing platforms used across gaming, data centers and AI.", price: 181.74, change: 3.12, changePercent: 1.75, marketCap: 4440000000000, peRatio: 49.2, dividendYield: 0.02, week52Low: 95.1, week52High: 184.6 },
  { ticker: "AAPL", companyName: "Apple Inc.", exchange: "NASDAQ", sector: "Technology", industry: "Consumer Electronics", currency: "USD", description: "Designs consumer hardware, software and services including iPhone, Mac and Apple services.", price: 229.98, change: -0.74, changePercent: -0.32, marketCap: 3500000000000, peRatio: 34.7, dividendYield: 0.44, week52Low: 169.2, week52High: 260.1 },
  { ticker: "MSFT", companyName: "Microsoft Corporation", exchange: "NASDAQ", sector: "Technology", industry: "Software", currency: "USD", description: "Provides cloud, productivity, operating system and enterprise software products.", price: 512.63, change: 2.41, changePercent: 0.47, marketCap: 3810000000000, peRatio: 38.8, dividendYield: 0.67, week52Low: 344.8, week52High: 513.5 },
  { ticker: "AMZN", companyName: "Amazon.com, Inc.", exchange: "NASDAQ", sector: "Consumer Cyclical", industry: "Internet Retail", currency: "USD", description: "Operates e-commerce, cloud infrastructure and digital services businesses globally.", price: 238.16, change: 1.08, changePercent: 0.46, marketCap: 2520000000000, peRatio: 35.1, dividendYield: 0, week52Low: 151.6, week52High: 242.5 },
  { ticker: "GOOGL", companyName: "Alphabet Inc.", exchange: "NASDAQ", sector: "Communication Services", industry: "Internet Content & Information", currency: "USD", description: "Operates Google Search, YouTube, cloud services and a broad portfolio of technology products.", price: 205.32, change: 1.67, changePercent: 0.82, marketCap: 2500000000000, peRatio: 29.4, dividendYield: 0.45, week52Low: 140.5, week52High: 207.1 },
  { ticker: "TSLA", companyName: "Tesla, Inc.", exchange: "NASDAQ", sector: "Consumer Cyclical", industry: "Auto Manufacturers", currency: "USD", description: "Develops electric vehicles, energy storage systems and related software and services.", price: 337.41, change: -4.62, changePercent: -1.35, marketCap: 1080000000000, peRatio: 184.3, dividendYield: 0, week52Low: 214.0, week52High: 488.5 }
];

export const run = mutation({
  args: {},
  handler: async (ctx) => {
    const ids = [];
    for (const stock of stocks) {
      const existing = await ctx.db.query("stocks").withIndex("by_ticker", q => q.eq("ticker", stock.ticker)).unique();
      const id = existing?._id ?? await ctx.db.insert("stocks", { ...stock, lastUpdated: Date.now() });
      if (existing) await ctx.db.patch(id, { ...stock, lastUpdated: Date.now() });
      ids.push(id);
      const existingNews = await ctx.db.query("news").withIndex("by_stock_published", q => q.eq("stockId", id)).first();
      if (!existingNews) await ctx.db.insert("news", { stockId: id, source: "Northstar Research", headline: `${stock.companyName} research coverage is now available`, summary: stock.description, url: `#${stock.ticker}`, publishedAt: Date.now() });
    }
    const watchlist = await ctx.db.query("watchlists").first();
    if (!watchlist) await ctx.db.insert("watchlists", { name: "My Watchlist", createdAt: Date.now() });
    return ids;
  }
});
