#!/usr/bin/env node

/**
 * Guardian Artifact Integrity Signer 1.0
 * Generates SHA-256 hashes for build artifacts and writes a manifest.
 * Space LEAF Corp — Seal of Modular Integrity
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ARTIFACT_DIR = path.resolve(__dirname, "../dist");
const MANIFEST_PATH = path.resolve(__dirname, "../dist/artifact-manifest.json");

function hashFile(filePath) {
  const data = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

function main() {
  console.log("Guardian Artifact Integrity Signer — Starting…");

  if (!fs.existsSync(ARTIFACT_DIR)) {
    throw new Error(`Artifact directory not found: ${ARTIFACT_DIR}`);
  }

  const files = fs.readdirSync(ARTIFACT_DIR).filter((f) => {
    const full = path.join(ARTIFACT_DIR, f);
    return fs.statSync(full).isFile();
  });

  const manifest = {
    version: "1.0.0",
    generated: new Date().toISOString(),
    description: "Integrity manifest for Guardian-Companion build artifacts.",
    artifacts: []
  };

  files.forEach((file) => {
    const fullPath = path.join(ARTIFACT_DIR, file);
    const hash = hashFile(fullPath);

    manifest.artifacts.push({
      file,
      sha256: hash
    });

    console.log(`✓ Signed artifact: ${file} (${hash})`);
  });

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");

  console.log(`✓ Artifact manifest written to ${MANIFEST_PATH}`);
  console.log("Seal of Modular Integrity reaffirmed.");
}

main();
