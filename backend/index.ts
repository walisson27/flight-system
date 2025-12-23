import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

type Flight = {
  id: string;
  aircraft: {
    name: string;
    registration: string;
    airline: string;
  };
  flightData: {
    date: string;
    balance: number;
    route: {
      from: string;
      to: string;
    };
  };
};

const filePath = path.join(__dirname, "data", "flights.json");

let flights: Flight[] = [];

try {
  const file = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(file);
  flights = json.flights || [];
} catch (error) {
  console.log("Erro ao ler o arquivo de voos");
  flights = [];
}

app.get("/flights", (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const flightsPage = flights.slice(startIndex, endIndex);

  const response = flightsPage.map(flight => ({
    id: flight.id,
    aircraft: flight.aircraft,
    route: flight.flightData.route,
    balance: flight.flightData.balance,
    date: flight.flightData.date,
  }));

  res.json({
    page,
    limit,
    total: flights.length,
    data: response,
  });
});

app.get("/flights/total-balance", (_req, res) => {
  let totalBalance = 0;

  flights.forEach(flight => {
    totalBalance += flight.flightData.balance;
  });

  res.json({ totalBalance });
});

app.get("/flights/:id", (req, res) => {
  const flightId = req.params.id;

  const flight = flights.find(f => f.id === flightId);

  if (!flight) {
    return res.status(404).json({
      error: "Voo não encontrado",
    });
  }

  res.json(flight);
});

app.use((_req, res) => {
  res.status(404).json({
    error: "Endpoint não encontrado",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
