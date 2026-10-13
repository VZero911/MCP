#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { CdpClient } from '@coinbase/cdp-sdk'
import { z } from 'zod'

const ALICE_URL = process.env.ALICE_URL || 'https://x402.alice-v0.workers.dev'
const CDP_ACCOUNT = process.env.CDP_ACCOUNT || 'alice-mcp-user'

const TOOLS = [
  { name: 'crypto-price', desc: 'Real-time cryptocurrency price, 24h change, volume', input: 'Crypto symbol (BTC, ETH, SOL...)' },
  { name: 'gas-price', desc: 'Gas prices on Ethereum, Base, Polygon, Arbitrum, Optimism', input: 'Optional: chain name' },
  { name: 'web-search', desc: 'AI-powered web search with summarized results', input: 'Search query' },
  { name: 'dns-lookup', desc: 'DNS records lookup for a domain', input: 'Domain name' },
  { name: 'security-scan', desc: 'Security scan of code, URLs, or smart contracts', input: 'Code snippet, URL, or contract address to scan' },
  { name: 'defi-scan', desc: 'DeFi protocol analysis — yield, arb, liquidation opportunities', input: 'Protocol name or DeFi query' },
  { name: 'analyze', desc: 'AI analysis of any text, data, or code', input: 'Text or data to analyze' },
  { name: 'summarize', desc: 'AI summarization of long text or documents', input: 'Text to summarize' },
  { name: 'review', desc: 'Code review with security and quality feedback', input: 'Code to review' },
  { name: 'query', desc: 'General AI query — ask anything about code, crypto, DeFi, security', input: 'Your question' },
  { name: 'trending', desc: 'Trending crypto tokens and market movers', input: 'Optional: category (defi, meme, l2...)' },
  { name: 'token-info', desc: 'Detailed token info — price, volume, market cap, status', input: 'Token symbol or name' },
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

const server = new McpServer({ name: 'alice-v0', version: '0.1.0' })

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
