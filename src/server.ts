// src/server.ts
import express from "express";
import quantumGuardianRouter from "./api/quantumGuardian";

const app = express();
app.use(express.json());

app.use("/api/quantum", quantumGuardianRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Quantum Guardian server listening on port ${port}`);
});
