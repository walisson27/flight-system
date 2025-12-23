import type { VercelRequest, VercelResponse } from '@vercel/node';
import flightsData from '../../data/flights.json';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const totalBalance = flightsData.reduce((sum, f) => sum + f.flightData.balance, 0);
  res.status(200).json({ totalBalance });
}
