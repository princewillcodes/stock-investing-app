import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getDefault = query({ args: {}, handler: async (ctx) => ctx.db.query("watchlists").order("asc").first() });

export const items = query({
  args: { watchlistId: v.id("watchlists") },
  handler: async (ctx, { watchlistId }) => {
    const links = await ctx.db.query("watchlistItems").withIndex("by_watchlist", (q) => q.eq("watchlistId", watchlistId)).collect();
    return Promise.all(links.map(async (link) => ({ ...link, stock: await ctx.db.get(link.stockId) })));
  }
});

export const add = mutation({
  args: { watchlistId: v.id("watchlists"), stockId: v.id("stocks") },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("watchlistItems").withIndex("by_watchlist_stock", (q) => q.eq("watchlistId", args.watchlistId).eq("stockId", args.stockId)).unique();
    if (existing) return existing._id;
    return ctx.db.insert("watchlistItems", { ...args, addedAt: Date.now() });
  }
});

export const remove = mutation({ args: { itemId: v.id("watchlistItems") }, handler: async (ctx, { itemId }) => ctx.db.delete(itemId) });

export const seedDefault = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("watchlists").order("asc").first();
    if (existing) return existing._id;
    return ctx.db.insert("watchlists", { name: "My Watchlist", createdAt: Date.now() });
  }
});
