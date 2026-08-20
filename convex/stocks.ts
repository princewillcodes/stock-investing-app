import { query } from "./_generated/server";
import { v } from "convex/values";

export const search = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, { searchTerm }) => {
    const term = searchTerm.trim().toUpperCase();
    if (!term) return [];
    const stocks = await ctx.db.query("stocks").collect();
    return stocks.filter((s) => s.ticker.toUpperCase().includes(term) || s.companyName.toUpperCase().includes(term)).slice(0, 8);
  }
});

export const getByTicker = query({
  args: { ticker: v.string() },
  handler: async (ctx, { ticker }) => ctx.db.query("stocks").withIndex("by_ticker", (q) => q.eq("ticker", ticker.toUpperCase())).unique()
});

export const getHistory = query({
  args: { stockId: v.id("stocks"), limit: v.optional(v.number()) },
  handler: async (ctx, { stockId, limit = 90 }) => {
    const rows = await ctx.db.query("priceHistory").withIndex("by_stock_timestamp", (q) => q.eq("stockId", stockId)).order("desc").take(limit);
    return rows.reverse();
  }
});
