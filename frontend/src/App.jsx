import "./App.css";
import { useState, useCallback} from "react";
import Reserver from "./components/reserver";
import ReservationList from "./components/resList";

const backend_url = process.env.REACT_APP_BACKEND ?? "";
function App() {
  const [reservations, setReservations] = useState([]);
  
  const refreshReservations = useCallback((showpast=false) => {
    const url = showpast ? `${backend_url}/api/get-reservations?past=True` : `${backend_url}/api/get-reservations`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setReservations(res);
      })
      .catch((err) => {
        console.error(err);
      }
    );
  },[]);


  return (
    <div className="container">
      <h1 className="text-center mt-5">BK Room Reserver</h1>
      <Reserver backend_url={backend_url} refreshReservations={refreshReservations}/>

      <h2 className="text-center mt-5">Reservations</h2>
      <ReservationList backend_url={backend_url} refreshReservations={refreshReservations} reservations={reservations} />
    </div>
  );
}

export default App;
