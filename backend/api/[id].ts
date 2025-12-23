import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const filePath = path.join(__dirname, "data", "flights.json");

  try {
    const file = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(file);
    const flights = json.flights || [];

    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ error: "Erro ao ler arquivo de voos" });
  }
}
