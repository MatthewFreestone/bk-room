import { useState, useEffect } from "react";
const Reserver = () => {
    
  const [username, setUsername] = useState("");
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

  return (
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
  )
}

export default Reserver;