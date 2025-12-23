import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HistoryFlight from "../historyFlight/HistoryFlight";
import "../FlightMenu/FlightMenu.css";

type Flight = {
  id: string;
  aircraft: {
    name: string;
    registration: string;
    airline: string;
  };
  route: {
    from: string;
    to: string;
  };
  balance: number;
  date: string;
};

const LIMIT = 10;

const FlightMenu = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadFlights = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const response = await fetch(
      `http://localhost:3000/flights?page=${page}&limit=${LIMIT}`
    );

    const result = await response.json();

    setFlights(prev => [...prev, ...result.data]);

    if (result.data.length < LIMIT) {
      setHasMore(false);
    }

    setPage(prev => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadFlights();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadFlights();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [page, hasMore, loading]);

  return (
    <main className="container">
      <section className="flights-list">
        <HistoryFlight />

        {flights.map(flight => (
          <article key={flight.id}>
            <Link to={`/flights/${flight.id}`} className="flight-link">
              <div className="flight-card">

                <div className="flight-info">
                  <strong>{flight.aircraft.name}</strong>
                  <span className="sub">{flight.aircraft.airline}</span>
                </div>

                <div className="route">
                  <span className="label">Trajeto</span>

                  <div className="route-line">
                    <span className="dot" />
                    <span className="line" />
                    <span className="dot" />
                  </div>

                  <div className="route-codes">
                    <span>{flight.route.from}</span>
                    <span>{flight.route.to}</span>
                  </div>
                </div>

                <div className="flight-info">
                  <span className="label">Matrícula</span>
                  <strong>{flight.aircraft.registration}</strong>
                </div>

                <div className="flight-info">
                  <span className="label">Data</span>
                  <strong>{flight.date}</strong>
                </div>

                <div className="flight-info balance flight-space">
                  <span className="label label-space">Saldo</span>
                  <strong
                    className={
                      flight.balance < 0 ? "negative" : "positive"
                    }
                  >
                    R$ {flight.balance.toLocaleString("pt-BR")}
                  </strong>
                </div>

              </div>
            </Link>
          </article>
        ))}
      </section>

      {hasMore && (
        <div ref={observerRef} className="loading">
          Carregando mais voos...
        </div>
      )}

      {!hasMore && (
        <p className="end">Todos os voos foram carregados</p>
      )}
    </main>
  );
};

export default FlightMenu;
