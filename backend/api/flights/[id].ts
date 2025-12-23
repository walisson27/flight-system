import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

type Flight = {
  id: string;
  aircraft: { name: string; registration: string; airline: string };
  flightData: { date: string; balance: number; route: { from: string; to: string } };
};

const filePath = path.join(__dirname, 'data', 'flights.json');

export default function handler(req: VercelRequest, res: VercelResponse) {
  let flights: Flight[] = [];
  try {
    const file = fs.readFileSync(filePath, 'utf-8');
    flights = JSON.parse(file).flights || [];
  } catch (err) {
    console.log('Erro ao ler arquivo de voos');
  }

  const { id } = req.query;
  const flight = flights.find(f => f.id === id);

  if (!flight) return res.status(404).json({ error: 'Voo não encontrado' });

  res.json(flight);
}
