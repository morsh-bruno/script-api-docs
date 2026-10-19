#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/**
 * Downloads types/script-api.d.ts, the input of the API reference, from the Bruno repository.
 *
 * The file is generated there from the JSDoc in packages/bruno-js (scripts/generate-script-api.js)
 * and committed, so it is fetched as-is rather than built here. SCRIPT_API_REF pins the commit,
 * tag or branch the reference is built from.
 */

const SCRIPT_API_REF = 'feat/script-api-reference';
const SCRIPT_API_URL = `https://raw.githubusercontent.com/morsh-bruno/bruno-dev/${SCRIPT_API_REF}/packages/bruno-js/types/script-api.d.ts`;
const OUT = path.resolve(__dirname, '..', 'types', 'script-api.d.ts');

const main = async () => {
  const response = await fetch(SCRIPT_API_URL);
  if (!response.ok) {
    throw new Error(`${SCRIPT_API_URL}: ${response.status} ${response.statusText}`);
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, await response.text());
  console.log(`Wrote ${path.relative(process.cwd(), OUT)} from ${SCRIPT_API_REF}`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
