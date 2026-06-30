// src/api/quantumGuardian.ts
import express from "express";
import { QuantumGuardianChat } from "../QuantumGuardianChat";

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message, role } = req.body;
  const reply = await quantumGuardianChat.handleMessage(message, role);
  res.json({ reply });
});

export default router;
