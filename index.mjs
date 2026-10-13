#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { CdpClient } from '@coinbase/cdp-sdk'
import { z } from 'zod'

const ALICE_URL = process.env.ALICE_URL || 'https://x402.alice-v0.workers.dev'
const CDP_ACCOUNT = process.env.CDP_ACCOUNT || 'alice-mcp-user'

const TOOLS = [
  { name: 'analyze', desc: 'Deep code analysis -- bugs, patterns, complexity, security', input: 'Code or text to analyze' },
  { name: 'review', desc: 'Professional code review with actionable feedback', input: 'Code to review' },
  { name: 'audit', desc: 'Security audit for Solidity smart contracts', input: 'Solidity contract code or address' },
  { name: 'defi-scan', desc: 'Scan DeFi protocols for yield, arb, liquidation opportunities', input: 'Protocol name or DeFi query' },
  { name: 'execute', desc: 'Execute a coding task -- write, fix, or modify code', input: 'Task description' },
  { name: 'query', desc: 'Answer questions about code, crypto, DeFi, security', input: 'Your question' },
  { name: 'debug', desc: 'Debug code -- find root cause and fix', input: 'Code with bug description' },
  { name: 'translate', desc: 'Translate code between languages (Python/JS/Rust/Go/Solidity)', input: 'Code and target language' },
  { name: 'docs', desc: 'Generate API docs, READMEs, JSDoc/TSDoc from code', input: 'Code to document' },
  { name: 'test', desc: 'Generate unit/integration tests for code', input: 'Code to test' },
  { name: 'security-scan', desc: 'OWASP Top 10, CVE check, dependency audit, vulnerability scan', input: 'Code, URL, or package to scan' },
  { name: 'api-design', desc: 'Design REST/GraphQL APIs -- OpenAPI spec, endpoints, schemas', input: 'API requirements' },
  { name: 'data-query', desc: 'SQL generation, data transformation, analytics queries', input: 'Data question or schema' },
  { name: 'frontend', desc: 'React/Vue/Svelte components, CSS, responsive layouts', input: 'UI component description' },
  { name: 'backend', desc: 'Express/FastAPI/Django services, middleware, auth, DB models', input: 'Backend service description' },
  { name: 'devops', desc: 'Dockerfiles, CI/CD pipelines, Kubernetes configs, infra-as-code', input: 'Infrastructure need' },
  { name: 'crypto-ops', desc: 'Wallet ops, token analysis, on-chain data, gas optimization', input: 'Crypto operation query' },
  { name: 'ai-prompt', desc: 'Prompt engineering, model selection, fine-tuning, RAG design', input: 'AI/ML question' },
  { name: 'architecture', desc: 'System design, scalability review, microservices planning', input: 'System requirements' },
  { name: 'agent-task', desc: 'A2A task execution -- agent-to-agent work requests', input: 'Task payload' },
  { name: 'ops-check', desc: 'Health checks, status pages, uptime monitoring, incident analysis', input: 'Service or URL to check' },
  { name: 'optimize', desc: 'Code optimization -- speed, memory, bundle size, DB queries', input: 'Code to optimize' },
  { name: 'crypto-price', desc: 'Real-time crypto prices -- BTC, ETH, SOL, 250+ tokens', input: 'Token symbol (BTC, ETH, SOL...)' },
  { name: 'web-extract', desc: 'Extract text from any URL -- clean text, title, meta, links', input: 'URL to extract' },
  { name: 'news-search', desc: 'Latest crypto/blockchain news and headlines', input: 'Search query' },
  { name: 'token-info', desc: 'Token info -- contract, chain, supply, holders, links', input: 'Token symbol or name' },
  { name: 'gas-price', desc: 'Gas prices on ETH, Base, Polygon, Arbitrum, Optimism', input: 'Optional: chain name' },
  { name: 'wallet-check', desc: 'ERC-20 balances for any wallet on Base/ETH/Polygon/Arbitrum', input: 'Wallet address' },
  { name: 'trending', desc: 'Trending crypto tokens -- gainers, losers, most searched', input: 'Optional: category (defi, meme, l2...)' },
  { name: 'web-search', desc: 'Web search -- top 10 results with titles, URLs, snippets', input: 'Search query' },
  { name: 'url-status', desc: 'Check if URLs are up or down -- HTTP status, latency, headers', input: 'URL or comma-separated URLs' },
  { name: 'dns-lookup', desc: 'DNS records -- A, AAAA, MX, TXT, NS, CNAME for any domain', input: 'Domain name' },
  { name: 'whois', desc: 'Domain registration info -- SOA, nameservers, status', input: 'Domain name' },
  { name: 'sitemap', desc: 'Crawl website sitemap -- pages, robots.txt, sitemap index', input: 'Website URL' },
  { name: 'summarize', desc: 'Summarize text, articles, documents into key points', input: 'Text to summarize' },
  { name: 'explain', desc: 'Explain code in plain English -- what, how, why', input: 'Code to explain' },
]

let x402Client = null

async function getX402Client() {
  if (x402Client) return x402Client
  const { CdpX402Client } = await import('@coinbase/cdp-sdk')
  const cdp = CdpClient.configureFromJson()
  x402Client = new CdpX402Client(cdp, { accountName: CDP_ACCOUNT })
  return x402Client
}

async function callModule(module, input) {
  const client = await getX402Client()
  const url = `${ALICE_URL}/api/module/${module}`
  const res = await client.post(url, { input })
  return res.data || res
}

const server = new McpServer({ name: 'alice-v0', version: '0.2.0' })

for (const tool of TOOLS) {
  server.tool(
    tool.name,
    tool.desc,
    { input: z.string().describe(tool.input) },
    async ({ input }) => {
      try {
        const result = await callModule(tool.name, input)
        return { content: [{ type: 'text', text: typeof result === 'string' ? result : JSON.stringify(result, null, 2) }] }
      } catch (e) {
        const msg = e.message || String(e)
        if (msg.includes('402') || msg.includes('payment')) {
          return { content: [{ type: 'text', text: `Payment required. Configure CDP SDK credentials to enable x402 micropayments.\nError: ${msg}` }], isError: true }
        }
        return { content: [{ type: 'text', text: `Error: ${msg}` }], isError: true }
      }
    }
  )
}

const transport = new StdioServerTransport()
await server.connect(transport)
