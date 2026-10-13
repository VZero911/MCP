<p align="center">
  <img src="https://img.shields.io/badge/MCP-Server-8f6cf0?style=for-the-badge&labelColor=07060f" alt="MCP" />
  <img src="https://img.shields.io/badge/ALICE%20V0-Powered-00ffcc?style=for-the-badge&labelColor=07060f" alt="ALICE V0" />
  <img src="https://img.shields.io/badge/x402-USDC%20on%20Base-f2c14e?style=for-the-badge&labelColor=07060f" alt="x402" />
</p>

<p align="center"><b>36 AI Agent Tools via MCP + x402 Micropayments</b></p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-ES%20Modules-339933?style=flat-square&logo=node.js&logoColor=white&labelColor=07060f" />
  <img src="https://img.shields.io/badge/Coinbase-CDP%20SDK-0052FF?style=flat-square&logo=coinbase&logoColor=white&labelColor=07060f" />
  <img src="https://img.shields.io/badge/Base-L2-0052FF?style=flat-square&labelColor=07060f" />
  <img src="https://img.shields.io/badge/Tools-36-5fd38d?style=flat-square&labelColor=07060f" />
  <img src="https://img.shields.io/badge/License-MIT-c0caf5?style=flat-square&labelColor=07060f" />
</p>

---

## What is this?

An [MCP](https://modelcontextprotocol.io) server exposing **36 AI tools**. Each call triggers an [x402](https://www.x402.org/) micropayment in USDC on Base — pay-per-use, no subscription, fully autonomous.

Works with **Claude Code**, **Cursor**, and any MCP-compatible client.

## Tools

### Code & Development

| Tool | Description | Price |
|---|---|---|
| `analyze` | Deep code analysis — bugs, patterns, complexity, security | $0.005 |
| `review` | Professional code review with actionable feedback | $0.005 |
| `debug` | Debug code — find root cause and fix | $0.005 |
| `execute` | Execute a coding task — write, fix, or modify code | $0.01 |
| `translate` | Translate code between languages (Python/JS/Rust/Go/Solidity) | $0.005 |
| `docs` | Generate API docs, READMEs, JSDoc/TSDoc from code | $0.002 |
| `test` | Generate unit/integration tests for code | $0.005 |
| `explain` | Explain code in plain English | $0.002 |
| `optimize` | Code optimization — speed, memory, bundle size, DB queries | $0.005 |
| `frontend` | React/Vue/Svelte components, CSS, responsive layouts | $0.005 |
| `backend` | Express/FastAPI/Django services, middleware, auth, DB models | $0.005 |

### Security & Infrastructure

| Tool | Description | Price |
|---|---|---|
| `security-scan` | OWASP Top 10, CVE check, dependency audit | $0.005 |
| `audit` | Security audit for Solidity smart contracts | $0.02 |
| `api-design` | Design REST/GraphQL APIs — OpenAPI spec, endpoints | $0.005 |
| `devops` | Dockerfiles, CI/CD, Kubernetes, infra-as-code | $0.005 |
| `architecture` | System design, scalability, microservices planning | $0.01 |
| `ops-check` | Health checks, uptime monitoring, incident analysis | $0.002 |

### Crypto & DeFi

| Tool | Description | Price |
|---|---|---|
| `crypto-price` | Real-time prices — BTC, ETH, SOL, 250+ tokens | $0.001 |
| `gas-price` | Gas on ETH, Base, Polygon, Arbitrum, Optimism | $0.001 |
| `token-info` | Token details — contract, chain, supply, holders | $0.002 |
| `trending` | Trending tokens — gainers, losers, most searched | $0.001 |
| `wallet-check` | ERC-20 balances on Base/ETH/Polygon/Arbitrum | $0.002 |
| `crypto-ops` | Wallet ops, on-chain data, gas optimization | $0.002 |
| `defi-scan` | Yield, arb, liquidation opportunities | $0.002 |
| `news-search` | Latest crypto/blockchain news and headlines | $0.002 |

### Web & Data

| Tool | Description | Price |
|---|---|---|
| `web-search` | Web search — top 10 results with snippets | $0.001 |
| `web-extract` | Extract text from any URL — clean text, meta, links | $0.002 |
| `dns-lookup` | DNS records — A, AAAA, MX, TXT, NS, CNAME | $0.001 |
| `whois` | Domain registration info — SOA, nameservers | $0.001 |
| `url-status` | Check URLs up/down — HTTP status, latency | $0.001 |
| `sitemap` | Crawl sitemaps — pages, robots.txt, index | $0.002 |
| `summarize` | Summarize text, articles, documents | $0.002 |
| `data-query` | SQL generation, data transformation, analytics | $0.002 |
| `query` | General AI query — code, crypto, DeFi, security | $0.002 |

### Agent-to-Agent

| Tool | Description | Price |
|---|---|---|
| `agent-task` | A2A task execution — agent-to-agent work requests | $0.002 |
| `ai-prompt` | Prompt engineering, model selection, RAG design | $0.005 |

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

Each tool call automatically triggers a micropayment via Coinbase CDP SDK. No manual transactions — you only pay for what you use. $0.001 to $0.02 per call.

## Environment

| Variable | Default | Description |
|---|---|---|
| `ALICE_URL` | `https://x402.alice-v0.workers.dev` | ALICE V0 endpoint |
| `CDP_ACCOUNT` | `alice-mcp-user` | CDP account name |

## Related

<p align="center">
  <a href="https://github.com/VZero911/A.L.I.C.E"><img src="https://img.shields.io/badge/A.L.I.C.E-AI%20Framework-00ffcc?style=for-the-badge&logo=github&labelColor=07060f" alt="ALICE" /></a>
  <a href="https://github.com/VZero911/AGENTS"><img src="https://img.shields.io/badge/AGENTS-Public%20Nodes-5fd38d?style=for-the-badge&logo=github&labelColor=07060f" alt="AGENTS" /></a>
  <a href="https://github.com/VZero911/THESEED"><img src="https://img.shields.io/badge/THESEED-Web3%20Game-f2c14e?style=for-the-badge&logo=github&labelColor=07060f" alt="THESEED" /></a>
</p>

---

<p align="center"><i>Design By V0</i></p>
