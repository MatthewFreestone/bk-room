import { useEffect } from "react";

const ReservationList = ({backend_url, reservations, refreshReservations}) => {

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
      .catch((err) => console.error(err))
      .then((res) => {
        if (res.error) {
          alert("Error deleting reservation: " + res.error);
          return;
        }
        console.log(res);
        refreshReservations();
      });
  };

  const milTimeToStandard = (milTime) => {
    let time = milTime.split(":")
    const pm = time[0] >= 12
    time[0] = (pm && time[0] !== '12') ? time[0] - 12 : time[0]
    return time.join(':') + (pm ? ' PM' : ' AM')
  }

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
          {reservations?.map((reservation) => (
            <tr key={reservation.appt_id}>
              <th scope="row">{reservation.appt_id}</th>
              <td>{reservation.username}</td>
              <td>{reservation.room}</td>
              <td>{milTimeToStandard(reservation.StartTime)}</td>
              <td>{milTimeToStandard(reservation.EndTime)}</td>
              <td>{reservation.Date}</td>
              <td><button className="btn btn-danger" onClick={() => deleteReservation(reservation.appt_id, reservation.room)}>Delete</button></td>
            </tr>
          ))}
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
