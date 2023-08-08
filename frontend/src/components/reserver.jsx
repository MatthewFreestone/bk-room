import { useState, useEffect, useRef, useMemo } from "react";

const Reserver = ({ backend_url }) => {
  const usernameRegex = useMemo(() => /^[a-z]{3}[0-9]{4}$/i, []);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [username, setUsername] = useState("");
  const room = useRef();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const supportedRooms = [
    "2116",
    "2118",
    "2120",
    "2125",
    "2127",
    "2130",
    "2128",
    "2132",
    "2135",
    "2137",
    "2145",
    "2147",
    "2153",
    "2159",
    "2161",
    "2162",
    "2164",
    "2166",
    "2168",
    "2170",
    "2174",
    "2143",
    "2151",
    "2157",
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    setUsername(username);
    fetch(`${backend_url}/api/reserve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        room: room.current.value,
        start: startTime,
        end: endTime,
        date,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    if (usernameRegex.test(username) && date && endTime > startTime) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  }, [usernameRegex, username, date, startTime, endTime]);

  return (
    <form className="mb-5" noValidate={true}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className={
            `form-control ${(username && ! usernameRegex.test(username)) ? "is-invalid" : ""}`
          }
          id="username"
          name="username"
          placeholder="Enter username (aaa0000)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="room">Room Number</label>
        <select 
        className="form-control" 
        ref={room}
        id="room" 
        name="room" 
        required>
          {supportedRooms.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="date">Date</label>
          <input
            className="form-control"
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="start">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="form-control"
            id="start"
            name="start"
            required
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="end">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={
              `form-control ${(startTime &&
                endTime &&
                startTime >= endTime) ? "is-invalid" : ""}`
            }
            id="end"
            name="end"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={!submitEnabled}
      >
        Reserve
      </button>
    </form>
  );
};

export default Reserver;
