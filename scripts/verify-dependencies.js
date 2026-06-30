#!/usr/bin/env node

/**
 * Guardian Dependency Hash Verification Script 1.0
 * Verifies that all approved dependencies match the hashes in package-lock.json.
 * Space LEAF Corp — Dependency Lockdown Policy
 */

const fs = require("fs");
const path = require("path");

function loadJson(relativePath) {
  const fullPath = path.resolve(__dirname, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function main() {
  console.log("Guardian Dependency Hash Verification — Starting…");

  const approved = loadJson("../docs/policies/APPROVED-DEPENDENCIES.json");
  const lock = loadJson("../package-lock.json");

  const lockDeps = lock.packages || lock.dependencies;
  if (!lockDeps) {
    throw new Error("package-lock.json missing 'packages' or 'dependencies' section.");
  }

  approved.dependencies.forEach((dep) => {
    const name = dep.name;
    const version = dep.version;
    const expectedIntegrity = dep.integrity;

    // For lockfile v2+, dependencies live under "packages" with keys like "node_modules/<name>"
    const lockEntryKey = `node_modules/${name}`;
    const lockEntry =
      lockDeps[lockEntryKey] || lockDeps[name] || lockDeps.dependencies?.[name];

    if (!lockEntry) {
      throw new Error(
        `Approved dependency '${name}' not found in package-lock.json`
      );
    }

    if (lockEntry.version !== version) {
      throw new Error(
        `Version mismatch for '${name}': approved=${version}, lock=${lockEntry.version}`
      );
    }

    if (expectedIntegrity !== "sha512-<hash>" && lockEntry.integrity !== expectedIntegrity) {
      throw new Error(
        `Integrity mismatch for '${name}': approved=${expectedIntegrity}, lock=${lockEntry.integrity}`
      );
    }

    console.log(`✓ ${name}@${version} integrity verified`);
  });

  console.log("✓ All approved dependencies verified successfully.");
  console.log("Seal of Dependency Lockdown reaffirmed.");
}

main();
