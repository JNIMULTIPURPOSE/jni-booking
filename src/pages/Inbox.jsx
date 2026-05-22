import { useEffect, useState } from "react";
import axios from "axios";

export default function Inbox() {
  const [bookings, setBookings] = useState([]);

  /* LOAD BOOKINGS */
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings"
      );

      setBookings(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* UPDATE STATUS */
  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        { status }
      );

      fetchBookings();

    } catch (error) {
      console.log(error);
    }
  };

  /* DELETE BOOKING */
  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this booking permanently?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/bookings/${id}`
      );

      fetchBookings();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 style={styles.title}>
        📥 Booking Inbox
      </h2>

      {bookings.length === 0 ? (
        <div style={styles.empty}>
          No bookings yet.
        </div>
      ) : (
        <div style={styles.grid}>
          {bookings.map((booking) => (
            <div
              key={booking._id}
              style={styles.card}
            >
              {/* IMAGE */}
              {booking.image ? (
                <img
                  src={booking.image}
                  alt={booking.house}
                  style={styles.image}
                />
              ) : (
                <div style={styles.noImage}>
                  No Image
                </div>
              )}

              <div style={styles.content}>
                <h3 style={styles.house}>
                  {booking.house}
                </h3>

                <p>
                  👤 {booking.name}
                </p>

                <p>
                  📞 {booking.phone}
                </p>

                {booking.email && (
                  <p>
                    📧 {booking.email}
                  </p>
                )}

                <p>
                  📍 {booking.location}
                </p>

                <p>
                  🛏️ {booking.roomType}
                </p>

                <p>
                  📅 {booking.checkin}
                </p>

                <p style={styles.price}>
                  💰 {booking.price}
                </p>

                {booking.notes && (
                  <p style={styles.notes}>
                    📝 {booking.notes}
                  </p>
                )}

                <div
                  style={{
                    ...styles.status,
                    background:
                      booking.status ===
                      "Approved"
                        ? "green"
                        : booking.status ===
                          "Rejected"
                        ? "crimson"
                        : "#d4af37",
                  }}
                >
                  {booking.status || "Pending"}
                </div>

                {/* ACTION BUTTONS */}
                <div style={styles.actions}>
                  <button
                    style={
                      styles.approveBtn
                    }
                    onClick={() =>
                      updateStatus(
                        booking._id,
                        "Approved"
                      )
                    }
                  >
                    ✅ Approve
                  </button>

                  <button
                    style={
                      styles.rejectBtn
                    }
                    onClick={() =>
                      updateStatus(
                        booking._id,
                        "Rejected"
                      )
                    }
                  >
                    ❌ Reject
                  </button>

                  <button
                    style={
                      styles.deleteBtn
                    }
                    onClick={() =>
                      deleteBooking(
                        booking._id
                      )
                    }
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  title: {
    color: "#ffd54f",
    marginBottom: "20px",
  },

  empty: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "30px",
    borderRadius: "14px",
    textAlign: "center",
    color: "white",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "20px",
  },

  card: {
    background:
      "rgba(255,255,255,0.08)",
    borderRadius: "16px",
    overflow: "hidden",
    border:
      "1px solid rgba(255,255,255,0.1)",
    color: "white",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },

  noImage: {
    height: "180px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "rgba(255,255,255,0.05)",
  },

  content: {
    padding: "16px",
  },

  house: {
    color: "#ffd54f",
    marginBottom: "10px",
  },

  price: {
    color: "#ffd54f",
    fontWeight: "bold",
    marginTop: "8px",
  },

  notes: {
    marginTop: "10px",
    opacity: 0.85,
    lineHeight: "1.5",
  },

  status: {
    marginTop: "15px",
    padding: "8px",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
    flexWrap: "wrap",
  },

  approveBtn: {
    flex: 1,
    padding: "10px",
    background: "green",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  rejectBtn: {
    flex: 1,
    padding: "10px",
    background: "crimson",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  deleteBtn: {
    width: "100%",
    padding: "10px",
    background: "#222",
    border: "1px solid crimson",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};