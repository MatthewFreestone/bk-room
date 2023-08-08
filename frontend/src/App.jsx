import "./App.css";
// import { useState, useEffect } from "react";
import Reserver from "./components/reserver";
import ReservationList from "./components/resList";
// import Deleter from "./components/deleter";

function App() {
  const backend_url = process.env.REACT_APP_BACKEND ?? "http://localhost:8080";
  return (
    <div className="container">
      <h1 className="text-center mt-5">Room Reserver</h1>
      <Reserver backend_url={backend_url}/>

      <h2 className="text-center">Reservations</h2>
      <ReservationList backend_url={backend_url}/>

      {/* <div className="row my-5">
        <div className="col">
          <h2 className="text-center">Delete Reservation</h2>
          <Deleter />
        </div>
        <div className="col">
          <h2 className="text-center">Reservations</h2>
          <ReservationList backend_url={backend_url}/>
        </div>
      </div> */}
    </div>
  );
}

export default App;
