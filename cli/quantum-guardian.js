#!/usr/bin/env node

/**
 * Quantum Guardian CLI 1.0
 * Space LEAF Corp — Terminal Interface
 *
 * Governed, emotionally-safe quantum assistant for terminal users.
 */

import { showBanner } from "./ui/banner.js";
import { promptLoop } from "./ui/prompt.js";

async function main() {
  showBanner();
  await promptLoop();
}

main();
