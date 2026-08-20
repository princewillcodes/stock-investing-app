import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  stocks: defineTable({
    ticker: v.string(), companyName: v.string(), exchange: v.string(),
    sector: v.optional(v.string()), industry: v.optional(v.string()), currency: v.string(),
    logoUrl: v.optional(v.string()), description: v.optional(v.string()),
    price: v.optional(v.number()), change: v.optional(v.number()), changePercent: v.optional(v.number()),
    marketCap: v.optional(v.number()), peRatio: v.optional(v.number()), dividendYield: v.optional(v.number()),
    week52Low: v.optional(v.number()), week52High: v.optional(v.number()), lastUpdated: v.optional(v.number())
  }).index("by_ticker", ["ticker"]).index("by_exchange", ["exchange"]),

  priceHistory: defineTable({
    stockId: v.id("stocks"), timestamp: v.number(), open: v.number(), high: v.number(), low: v.number(), close: v.number(), volume: v.number()
  }).index("by_stock_timestamp", ["stockId", "timestamp"]),

  news: defineTable({
    stockId: v.id("stocks"), headline: v.string(), source: v.string(), url: v.string(), publishedAt: v.number(), summary: v.optional(v.string()), imageUrl: v.optional(v.string())
  }).index("by_stock_published", ["stockId", "publishedAt"]),

  watchlists: defineTable({ name: v.string(), createdAt: v.number() }),
  watchlistItems: defineTable({ watchlistId: v.id("watchlists"), stockId: v.id("stocks"), addedAt: v.number() })
    .index("by_watchlist", ["watchlistId"]).index("by_watchlist_stock", ["watchlistId", "stockId"])
});
