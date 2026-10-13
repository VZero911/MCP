# ALICE V0 — MCP Server

AI agent tools accessible via [MCP](https://modelcontextprotocol.io) with [x402](https://www.x402.org/) micropayments on Base.

## Tools

| Tool | Description | Price |
|------|-------------|-------|
| `crypto-price` | Real-time crypto price, volume, 24h change | $0.001 |
| `gas-price` | Gas prices on ETH, Base, Polygon, Arbitrum, OP | $0.001 |
| `web-search` | AI-powered web search | $0.005 |
| `dns-lookup` | DNS records for any domain | $0.002 |
| `security-scan` | Security scan of code or contracts | $0.01 |
| `defi-scan` | DeFi yield/arb/liquidation analysis | $0.005 |
| `analyze` | AI analysis of text, data, or code | $0.01 |
| `summarize` | AI summarization | $0.005 |
| `review` | Code review with security feedback | $0.01 |
| `query` | General AI query | $0.01 |
| `trending` | Trending crypto tokens | $0.002 |
| `token-info` | Detailed token info and market data | $0.002 |

## Setup

### 1. Install

```bash
npm install alice-v0-mcp
```

### 2. Configure CDP SDK

Create a CDP API key at [portal.cdp.coinbase.com](https://portal.cdp.coinbase.com) and configure:

```bash
export CDP_API_KEY_ID="your-key-id"
export CDP_API_KEY_SECRET="your-key-secret"
```

Or use `~/.config/coinbase-sdk/default/api_key.json`.

### 3. Add to Claude Code

```json
{
  "mcpServers": {
    "alice-v0": {
      "command": "npx",
      "args": ["alice-v0-mcp"]
    }
  }
}
```

### 4. Add to Cursor

Settings → MCP Servers → Add:
- Name: `alice-v0`
- Command: `npx alice-v0-mcp`

## How it works

Each tool call triggers an [x402](https://www.x402.org/) micropayment in USDC on Base (L2). Payments are handled automatically by the CDP SDK — no manual transactions needed. You only pay for what you use.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `ALICE_URL` | `https://x402.alice-v0.workers.dev` | ALICE V0 endpoint |
| `CDP_ACCOUNT` | `alice-mcp-user` | CDP account name for payments |

## License

MIT
