import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pilops from "./components/PilopsBanner/Pilops";
import "./styles/menu.css"
import  FlightMenu  from "./components/FlightMenu/FlightMenu";
import FlightDetails from "./components/FlightDetails/FlightDetails";


export default function App() {
  return (
   <div className="App">
    <Pilops/>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<FlightMenu />} />
        <Route path="/flights/:id" element={<FlightDetails />} />
      </Routes>
    </BrowserRouter>
   </div>
  );
}
