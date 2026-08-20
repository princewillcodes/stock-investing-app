# Northstar

Sleek, dark stock research and investing application built around the second interface direction we selected.

## Stack

- Next.js App Router + TypeScript
- React
- Convex database/backend
- Lucide icons
- CSS-first UI

## Product surfaces

- Overview / stock research dashboard
- `/discover` company discovery
- `/stocks/[ticker]` dynamic stock research pages
- `/portfolio` portfolio/holdings view
- `/news` market intelligence feed
- Convex-backed stock search and watchlist mutations
- Convex data model for stocks, OHLCV history, news, watchlists, portfolios and positions

## Convex setup

1. Install dependencies: `npm install`
2. Run `npx convex dev` and follow the prompts to create/select a Convex deployment.
3. Make sure `NEXT_PUBLIC_CONVEX_URL` is available to Next.js.
4. Seed the demo universe with `npm run seed`.
5. Start the app with `npm run dev`.

The Convex CLI generates schema-aware files under `convex/_generated`; this repository includes lightweight fallbacks so the source tree remains understandable before code generation.

## Data providers

The database is intentionally provider-neutral. The next production integration should ingest live quotes, historical OHLCV, fundamentals and news through Convex actions and scheduled jobs, keeping provider credentials server-side.

Do not commit API keys. Use Convex environment variables for server-side market/news credentials.

## Roadmap

1. Authenticate users and make watchlists/portfolios user-owned.
2. Connect a live market-data provider.
3. Ingest historical prices and corporate fundamentals.
4. Connect a news provider and normalize articles.
5. Add transactions, cost basis, realized/unrealized P&L and allocation analytics.
6. Add financial statements, estimates, filings and an AI research workspace.
7. Add alerts and portfolio notifications.
