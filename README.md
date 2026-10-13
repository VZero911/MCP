<p align="center">
  <img src="https://img.shields.io/badge/MCP-Server-8f6cf0?style=for-the-badge&labelColor=07060f" alt="MCP" />
  <img src="https://img.shields.io/badge/ALICE%20V0-Powered-00ffcc?style=for-the-badge&labelColor=07060f" alt="ALICE V0" />
  <img src="https://img.shields.io/badge/x402-USDC%20on%20Base-f2c14e?style=for-the-badge&labelColor=07060f" alt="x402" />
</p>

<p align="center"><b>AI Agent Tools via MCP + x402 Micropayments</b></p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-ES%20Modules-339933?style=flat-square&logo=node.js&logoColor=white&labelColor=07060f" />
  <img src="https://img.shields.io/badge/Coinbase-CDP%20SDK-0052FF?style=flat-square&logo=coinbase&logoColor=white&labelColor=07060f" />
  <img src="https://img.shields.io/badge/Base-L2-0052FF?style=flat-square&labelColor=07060f" />
  <img src="https://img.shields.io/badge/Tools-12-5fd38d?style=flat-square&labelColor=07060f" />
  <img src="https://img.shields.io/badge/License-MIT-c0caf5?style=flat-square&labelColor=07060f" />
</p>

---

## What is this?

An [MCP](https://modelcontextprotocol.io) server exposing 12 AI tools. Each call triggers an [x402](https://www.x402.org/) micropayment in USDC on Base — pay-per-use, no subscription, fully autonomous.

Works with **Claude Code**, **Cursor**, and any MCP-compatible client.

## Tools

| Tool | Description | Price |
|---|---|---|
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

Create a CDP API key at [portal.cdp.coinbase.com](https://portal.cdp.coinbase.com):

```bash
export CDP_API_KEY_ID="your-key-id"
export CDP_API_KEY_SECRET="your-key-secret"
```

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

```
Client (Claude/Cursor)  →  MCP Server  →  x402 Payment (USDC/Base)  →  ALICE V0 API  →  Result
```

Each tool call automatically triggers a micropayment via Coinbase CDP SDK. No manual transactions needed — you only pay for what you use.

## Environment

| Variable | Default | Description |
|---|---|---|
| `ALICE_URL` | `https://x402.alice-v0.workers.dev` | ALICE V0 endpoint |
| `CDP_ACCOUNT` | `alice-mcp-user` | CDP account name |

## Related

<p align="center">
  <a href="https://github.com/VZero911/A.L.I.C.E"><img src="https://img.shields.io/badge/A.L.I.C.E-AI%20Framework-00ffcc?style=for-the-badge&logo=github&labelColor=07060f" alt="ALICE" /></a>
  <a href="https://github.com/VZero911/AGENTS"><img src="https://img.shields.io/badge/AGENTS-Public%20Nodes-5fd38d?style=for-the-badge&logo=github&labelColor=07060f" alt="AGENTS" /></a>
</p>

---

<p align="center"><i>Design By V0</i></p>
