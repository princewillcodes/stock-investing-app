import { query } from "./_generated/server";
import { v } from "convex/values";

export const featured = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 12 }) => (await ctx.db.query("stocks").collect()).slice(0, limit)
});

export const movers = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 8 }) => {
    const stocks = await ctx.db.query("stocks").collect();
    return stocks.sort((a, b) => Math.abs(b.changePercent ?? 0) - Math.abs(a.changePercent ?? 0)).slice(0, limit);
  }
});

export const bySector = query({
  args: { sector: v.string() },
  handler: async (ctx, { sector }) => (await ctx.db.query("stocks").collect()).filter(s => s.sector === sector)
});
