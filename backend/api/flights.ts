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

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const flightsPage = flights.slice(startIndex, endIndex);

  const response = flightsPage.map(f => ({
    id: f.id,
    aircraft: f.aircraft,
    route: f.flightData.route,
    balance: f.flightData.balance,
    date: f.flightData.date
  }));

  res.json({ page, limit, total: flights.length, data: response });
}
