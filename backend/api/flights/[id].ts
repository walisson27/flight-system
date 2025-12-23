import type { VercelRequest, VercelResponse } from '@vercel/node';
import flightsData from '../../data/flights.json';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  const flight = flightsData.find(f => f.id === id);

  if (!flight) {
    return res.status(404).json({ error: 'Voo não encontrado' });
  }

  res.status(200).json(flight);
}
