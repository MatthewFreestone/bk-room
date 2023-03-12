import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [reservations, setReservations] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const room = e.target.room.value;
    const start = e.target.start.value;
    const end = e.target.end.value;
    const date = e.target.date.value;
    localStorage.setItem("username", username);
    setUsername(username);
    fetch("/api/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        room,
        start,
        end,
        date,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    fetch("/api/get-reservations?past=True")
      .then((res) => res.json())
      .then((res) => {
        setReservations(res);
      });
  }, []);
  useEffect(() => {
    localStorage.getItem("username") &&
      setUsername(localStorage.getItem("username"));
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-5">Room Reserver</h1>
      <form action="/api/reserve" method="POST" className="mb-5">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Enter username (aaa0000)"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <label htmlFor="room">Room Number</label>
          <input
            type="text"
            className="form-control"
            id="room"
            name="room"
            placeholder="Enter room number (2127)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="start">Start Time</label>
          <input
            type="text"
            className="form-control"
            id="start"
            name="start"
            placeholder="Enter start time (13:00)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="end">End Time</label>
          <input
            type="text"
            className="form-control"
            id="end"
            name="end"
            placeholder="Enter end time (14:00)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="text"
            className="form-control"
            id="date"
            name="date"
            placeholder="Enter date (2022-12-25)"
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          Reserve
        </button>
      </form>
      <div className="row my-5">
        <div className="col">
          <h2 className="text-center">Delete Reservation</h2>
          <form action="/api/delete" method="POST">
            <div className="form-group">
              <label htmlFor="username">Appt ID</label>
              <input
                type="text"
                className="form-control"
                id="appt_id"
                name="appt_id"
                placeholder="Enter Appt_id (00000)"
              />
            </div>
            <div className="form-group">
              <label htmlFor="room">Room Number</label>
              <input
                type="text"
                className="form-control"
                id="room_delete"
                name="room"
                placeholder="Enter room number (2127)"
              />
            </div>
            <button type="submit" className="btn btn-danger">
              Delete
            </button>
          </form>
        </div>
        <div className="col">
          <h2 className="text-center">Reservations</h2>
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
      </div>
    </div>
  );
}

export default App;
