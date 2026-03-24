import { readFile, writeFile } from 'node:fs/promises'

async function fetchToJson (
  url = 'https://raw.githubusercontent.com/oven-sh/bun/refs/heads/main/src/install/default-trusted-dependencies.txt',
) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
  }

  const text = await response.text()

  // Split into lines, trim whitespace, drop blanks & comments
  const bunEntries = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))

  // Read our custom pnpm-allow.json
  const pnpmAllowJson = await readFile('pnpm-allow.json', 'utf8')
  const pnpmEntries = JSON.parse(pnpmAllowJson)

  // Merge, deduplicate, and sort
  const combined = [...new Set([...bunEntries, ...pnpmEntries])].sort()

  const outPath = `allow.json`
  await writeFile(outPath, JSON.stringify(combined, null, 2), "utf8")

  // Generate allowBuilds.json (Record<string, boolean>)
  const { createRequire } = await import('node:module')
  const require = createRequire(import.meta.url)
  const untrusted = require('./untrusted.js')
  const allowBuilds = {}
  for (const pkg of untrusted.sort()) {
    allowBuilds[pkg] = false
  }
  for (const pkg of combined) {
    if (!(pkg in allowBuilds)) {
      allowBuilds[pkg] = true
    }
  }
  const allowBuildsPath = 'allowBuilds.json'
  await writeFile(allowBuildsPath, JSON.stringify(allowBuilds, null, 2), "utf8")

  console.log(`✅  Saved ${combined.length} items to ${outPath} (${bunEntries.length} from bun + ${pnpmEntries.length} from pnpm-allow.json)`)
  console.log(`✅  Saved ${Object.keys(allowBuilds).length} items to ${allowBuildsPath}`)
}

fetchToJson().catch((err) => {
  console.error(`❌  ${err.message}`)
  process.exitCode = 1
})
