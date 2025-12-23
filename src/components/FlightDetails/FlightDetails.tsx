import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./FlightDetails.css"
import vector from "../../assets/Vector.png"
import recompensas from "../../assets/recompensas.png"
import ganhos from "../../assets/ganhos.png"
import xp from "../../assets/xp.png"
import bonus from "../../assets/bonus.png"

type FlightDetailsType = {
  aircraft: {
    name: string;
    airline: string;
    registration: string;
  };
  flightData: {
    date: string;
    balance: number;
    route: {
      from: string;
      to: string;
    };
    xp: number,
    missionBonus:number,
  };
};

const FlightDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState<FlightDetailsType | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/flights/${id}`)
      .then(res => res.json())
      .then(data => setFlight(data));
  }, [id]);

  if (!flight) return <p className="container">Carregando...</p>;

  return (
    <div className="container ">
      <div className="container-back" onClick={() => navigate(-1)}>
        <img className="img-back"
            src={vector}
            alt="vector"
            style={{ width: 15.7, height: 26.67, marginRight: 2 }}
          />
         Detalhes do voo
      </div>

      <div className="details-card">
        <h3 className="h3-recompensas"><img
            src={recompensas}
            alt="recompensas"
            style={{ width: 24, height: 24, marginRight: 2 }}
          /> 
          Recompensas</h3>

      <div className="rewards">
          <div className="ganhos">
            <img
            src={ganhos}
            alt="ganhos"
            style={{ width: 48, height: 48, marginRight: 2 }}
          /> 
          <div className="ganhos-totais">
            <span className="label label-ganhos">Ganhos totais</span>
            <strong
                    className={
                      flight.flightData.balance < 0 ? "negative" : "positive"
                    }
                  >
                    R$ {flight.flightData.balance.toLocaleString("pt-BR")}
            </strong>
          </div>
          </div>

          <div className="xp-container">
            <img
            src={xp}
            alt="xp"
            style={{ width: 41.2, height: 34.46, marginRight: 2 }}
          /> 
            <div className="xp-conquistado">
            <span className="label xp-label">XP conquistado</span>
            <strong className="xp-strong"> {flight.flightData.xp}</strong>
            </div>
          </div>

          <div className="bonus-container">
            <img
            src={bonus}
            alt="bonus"
            style={{ width: 48, height: 48, marginRight: 2 }}
            /> 
            <div className="bonus-missao">
            <span className="label bonus-label">Bônus de missão</span>
            <strong className="bonus-strong">{flight.flightData.missionBonus}%</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="details-card">
        <div className="details-row">
          <div className="container-fligth">
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
              <span>{flight.flightData.route.from}</span>
              <span>{flight.flightData.route.to}</span>
            </div>
          </div>

          <div className="container-matricula">
            <span className="label label-matricula">Matrícula</span>
            <strong className="strong-matricula">{flight.aircraft.registration}</strong>
          </div>

          <div className="container-data">
            <span className="label label-data">Data</span>
            <strong>{flight.flightData.date}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FlightDetails
