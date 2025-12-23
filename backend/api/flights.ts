import type { VercelRequest, VercelResponse } from '@vercel/node';
import flightsData from '../data/flights.json';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const flightsPage = flightsData.slice(startIndex, endIndex);

  const response = flightsPage.map(flight => ({
    id: flight.id,
    aircraft: flight.aircraft,
    route: flight.flightData.route,
    balance: flight.flightData.balance,
    date: flight.flightData.date,
    xp: flight.flightData.xp,
    missionBonus: flight.flightData.missionBonus,
  }));

  res.status(200).json({
    page,
    limit,
    total: flightsData.length,
    data: response,
  });
}
