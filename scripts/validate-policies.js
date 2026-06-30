#!/usr/bin/env node

/**
 * Guardian Policy Validator 1.0
 * Space LEAF Corp — Emotional Safety & Modular Integrity Standard
 *
 * Validates all policy files defined in guardian.config.json.
 */

const fs = require("fs");
const path = require("path");

const REQUIRED_FIELDS = ["id", "roles", "rules"];
const VALID_RULE_TYPES = ["allow", "block", "flag", "transform"];
const VALID_CATEGORIES = [
  "PUBLIC",
  "SENSITIVE",
  "CHILD",
  "VIOLENCE",
  "FEAR",
  "EXPLOITATION",
  "EDUCATIONAL",
  "NEUTRAL"
];

function loadConfig() {
  const configPath = path.resolve(__dirname, "../config/guardian.config.json");
  if (!fs.existsSync(configPath)) {
    throw new Error("guardian.config.json not found.");
  }
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function validatePolicyStructure(policy, filePath) {
  REQUIRED_FIELDS.forEach((field) => {
    if (!policy[field]) {
      throw new Error(
        `Policy ${filePath} is missing required field: ${field}`
      );
    }
  });
}

function validateRules(policy, filePath) {
  policy.rules.forEach((rule, index) => {
    if (!VALID_RULE_TYPES.includes(rule.type)) {
      throw new Error(
        `Invalid rule type '${rule.type}' in ${filePath} at rule index ${index}`
      );
    }

    if (rule.category && !VALID_CATEGORIES.includes(rule.category)) {
      throw new Error(
        `Invalid category '${rule.category}' in ${filePath} at rule index ${index}`
      );
    }
  });
}

function validateEmotionalSafety(policy, filePath) {
  if (policy.id.includes("emotional-safety")) {
    if (!policy.emotionalRiskModel) {
      throw new Error(
        `Emotional safety policy ${filePath} missing emotionalRiskModel`
      );
    }
    if (!policy.guidance) {
      throw new Error(
        `Emotional safety policy ${filePath} missing guidance section`
      );
    }
  }
}

function validatePolicyFile(filePath) {
  const fullPath = path.resolve(__dirname, "../config/policies", filePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Policy file not found: ${fullPath}`);
  }

  const policy = JSON.parse(fs.readFileSync(fullPath, "utf8"));

  console.log(`Validating policy: ${filePath}`);

  validatePolicyStructure(policy, filePath);
  validateRules(policy, filePath);
  validateEmotionalSafety(policy, filePath);

  console.log(`✓ ${filePath} passed validation`);
}

function main() {
  console.log("Guardian Policy Validator 1.0 — Starting…");

  const config = loadConfig();
  const policyPaths = config.policies.paths;

  policyPaths.forEach((policyPath) => {
    const fileName = path.basename(policyPath);
    validatePolicyFile(fileName);
  });

  console.log("✓ All policies validated successfully.");
  console.log("Seal of Modular Integrity reaffirmed.");
}

main();
