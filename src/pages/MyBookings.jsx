import { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings() {
  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    const loadBookings = async () => {
      try {
        if (!user?.email) {
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `https://jni-backend.onrender.com/api/bookings/user/${user.email}`
        );

        setBookings(res.data);

      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    loadBookings();
  }, []);

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading bookings...
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        📅 My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div style={styles.empty}>
          No bookings found.
        </div>
      ) : (
        <div style={styles.grid}>
          {bookings.map((booking) => (
            <div
              key={booking._id}
              style={styles.card}
            >
              <h3>
                {booking.house}
              </h3>

              <p>
                📍 {booking.location}
              </p>

              <p>
                🏷️ {booking.category}
              </p>

              <p>
                📅 {booking.checkin}
              </p>

              <p>
                📧 {booking.email}
              </p>

              <p>
                📞 {booking.phone}
              </p>

              <div
                style={{
                  ...styles.status,
                  background:
                    booking.status ===
                    "Approved"
                      ? "#4caf50"
                      : booking.status ===
                        "Rejected"
                      ? "#f44336"
                      : "#ff9800",
                }}
              >
                {booking.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    color: "white",
  },

  title: {
    color: "#ffd54f",
    marginBottom: "20px",
  },

  loading: {
    color: "white",
    padding: "20px",
  },

  empty: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "12px",
  },

  grid: {
    display: "grid",
    gap: "15px",
  },

  card: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "14px",
  },

  status: {
    marginTop: "12px",
    padding: "8px",
    borderRadius: "8px",
    fontWeight: "bold",
    textAlign: "center",
  },
};