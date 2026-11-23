// Entry program for Florence's make.fun "post on X" bounty entry
// (post-x-the-agent-builds-a-game-from-20261122-1709), Node 22, standard library only.
//
// The entry is the X post itself: the agent made a short video of an AI coding agent
// building the browser game Coral Bay Heat from one prompt, the video ends with
// make.fun's referral end card carrying her referral code, and the post's text carries
// the bounty line and her play code. This program's one job is to hand the gate the
// post's address: it reads POST.json at the repository root, sanity-checks the address
// it names, and copies the file to the output directory, where the gate reads it.
//
// The starter POST.json holds a placeholder address; the gate refuses it as it stands.
// The placeholder is passed through untouched so the local run-through behaves exactly
// like the starter, but a real address that is not an X post address is a mistake the
// entrant would rather catch here than at the gate, so it stops the run.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in
// for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const PLACEHOLDER = 'https://x.com/<handle>/status/<id>';
const POST_URL = /^https:\/\/(x|twitter)\.com\/[^/\s]+\/status\/\d+(?:[/?#]\S*)?$/;

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

const source = join(BOT_DIR, 'POST.json');

let parsed: { url?: unknown };
try {
  parsed = JSON.parse(readFileSync(source, 'utf8'));
} catch (err) {
  fail(`POST.json could not be read and parsed from ${source}: ${(err as Error).message}`);
}

const url = parsed.url;
if (typeof url !== 'string' || url.length === 0) {
  fail('POST.json must name the post address in a "url" string');
}
if (url !== PLACEHOLDER && !POST_URL.test(url)) {
  fail(`POST.json url is not an X post address: ${url}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const destination = join(OUTPUT_DIR, 'POST.json');
try {
  copyFileSync(source, destination);
} catch (err) {
  fail(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
}

// Read the copy back and compare bytes: the gate reads only the output file, so a
// copy that landed short or altered is worth failing loudly here, not silently there.
const handedOver = readFileSync(destination);
if (!handedOver.equals(readFileSync(source))) {
  fail('the copied POST.json differs from the repository POST.json');
}
