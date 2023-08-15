import { useState, useEffect, useCallback } from "react";

const ReservationList = ({backend_url}) => {
  const [reservations, setReservations] = useState();

  const refreshReservations = useCallback(() => {
    fetch(`${backend_url}/api/get-reservations?past=True`)
      .then((res) => res.json())
      .then((res) => {
        setReservations(res);
      })
      .catch((err) => {
        console.log(err);
      }
    );
  }, [backend_url]);

  const deleteReservation = (appt_id, room) => {
    fetch(`${backend_url}/api/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appt_id: appt_id,
        room: room,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        refreshReservations();
      });
  };

  useEffect(() => {
    refreshReservations();
  }, [refreshReservations]);

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Appt ID</th>
            <th scope="col">Username</th>
            <th scope="col">Room</th>
            <th scope="col">Start</th>
            <th scope="col">End</th>
            <th scope="col">Date</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {reservations &&
            reservations.map((reservation) => {
              return (
                <tr key={reservation.appt_id}>
                  <th scope="row">{reservation.appt_id}</th>
                  <td>{reservation.username}</td>
                  <td>{reservation.room}</td>
                  <td>{reservation.StartTime}</td>
                  <td>{reservation.EndTime}</td>
                  <td>{reservation.Date}</td>
                  <td><button className="btn btn-danger" onClick={
                    () => deleteReservation(reservation.appt_id, reservation.room)
                  }>Delete</button></td>
                </tr>
              );
            })}
          {!reservations && (
            <tr>
              <td colSpan="7">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
