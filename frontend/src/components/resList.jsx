import { useState, useEffect } from "react";

const ReservationList = () => {
  const [reservations, setReservations] = useState();
  const backend_url = process.env.REACT_APP_BACKEND;

  useEffect(() => {
    console.log(`${backend_url}/api/get-reservations?past=True`)
    fetch(`${backend_url}/api/get-reservations?past=True`)
      .then((res) => res.json())
      .then((res) => {
        setReservations(res);
      });
  }, []);

  return (
    <div class="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Appt ID</th>
            <th scope="col">Username</th>
            <th scope="col">Room</th>
            <th scope="col">Start</th>
            <th scope="col">End</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {reservations &&
            reservations.map((reservation) => {
              return (
                <tr key={reservation.id}>
                  <th scope="row">{reservation.appt_id}</th>
                  <td>{reservation.username}</td>
                  <td>{reservation.room}</td>
                  <td>{reservation.StartTime}</td>
                  <td>{reservation.EndTime}</td>
                  <td>{reservation.Date}</td>
                </tr>
              );
            })}
          {!reservations && (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
