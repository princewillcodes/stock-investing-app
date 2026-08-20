import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const positions = query({
  args: { portfolioKey: v.string() },
  handler: async (ctx, { portfolioKey }) => {
    const portfolio = await ctx.db.query("portfolios").withIndex("by_owner", q => q.eq("ownerKey", portfolioKey)).unique();
    if (!portfolio) return [];
    const rows = await ctx.db.query("positions").withIndex("by_portfolio", q => q.eq("portfolioId", portfolio._id)).collect();
    return Promise.all(rows.map(async row => ({ ...row, stock: await ctx.db.get(row.stockId) })));
  }
});

export const upsertPosition = mutation({
  args: { portfolioKey: v.string(), stockId: v.id("stocks"), shares: v.number(), averageCost: v.number() },
  handler: async (ctx, args) => {
    let portfolio = await ctx.db.query("portfolios").withIndex("by_owner", q => q.eq("ownerKey", args.portfolioKey)).unique();
    if (!portfolio) portfolio = await ctx.db.insert("portfolios", { ownerKey: args.portfolioKey, name: "Main Portfolio", createdAt: Date.now() }).then(id => ctx.db.get(id));
    if (!portfolio) throw new Error("Unable to create portfolio");
    const existing = await ctx.db.query("positions").withIndex("by_portfolio_stock", q => q.eq("portfolioId", portfolio!._id).eq("stockId", args.stockId)).unique();
    const payload = { portfolioId: portfolio._id, stockId: args.stockId, shares: args.shares, averageCost: args.averageCost, updatedAt: Date.now() };
    if (existing) { await ctx.db.patch(existing._id, payload); return existing._id; }
    return await ctx.db.insert("positions", payload);
  }
});

export const removePosition = mutation({ args: { positionId: v.id("positions") }, handler: async (ctx, { positionId }) => ctx.db.delete(positionId) });
