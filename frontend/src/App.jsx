import "./App.css";
import { useState, useEffect } from "react";
import Reserver from "./components/reserver";
import ReservationList from "./components/resList";
import Deleter from "./components/deleter";

function App() {
  return (
    <div className="container">
      <h1 className="text-center mt-5">Room Reserver</h1>
      <Reserver />
      <div className="row my-5">
        <div className="col">
          <h2 className="text-center">Delete Reservation</h2>
          <Deleter />
        </div>
        <div className="col">
          <h2 className="text-center">Reservations</h2>
          <ReservationList />
        </div>
      </div>
    </div>
  );
}

export default App;
