const Deleter = () => {
  return (
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
  );
};

export default Deleter;
