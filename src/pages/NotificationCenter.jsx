import { useEffect, useState } from "react";

export default function NotificationCenter({
  setActive,
}) {
  const [notifications, setNotifications] =
    useState([]);

  // LOAD NOTIFICATIONS
  const loadNotifications = () => {
    const bookings =
      JSON.parse(
        localStorage.getItem("jni_bookings")
      ) || [];

    const chats =
      JSON.parse(
        localStorage.getItem("jni_chat")
      ) || [];

    // BOOKING NOTIFICATIONS
    const bookingNotifications =
      bookings.map((b) => ({
        id: `booking-${b.id}`,
        type: "booking",
        text: `📥 New booking from ${
          b.name || "Customer"
        }`,
        time: b.date || "Now",
        created: b.id,
      }));

    // ONLY UNREAD CHAT NOTIFICATIONS
    const unreadChats = chats.filter(
      (c) =>
        c.sender !== "admin" &&
        !c.read
    );

    // GROUP CHATS BY USER
    const groupedChats = {};

    unreadChats.forEach((c) => {
      if (!groupedChats[c.user]) {
        groupedChats[c.user] = 0;
      }

      groupedChats[c.user]++;
    });

    const chatNotifications = Object.entries(
      groupedChats
    ).map(([user, count], index) => ({
      id: `chat-${index}`,
      type: "chat",
      text: `💬 ${count} unread message(s) from ${user}`,
      time: "Now",
      created: Date.now() - index,
    }));

    // COMBINE
    const combined = [
      ...bookingNotifications,
      ...chatNotifications,
    ];

    // SORT NEWEST
    combined.sort(
      (a, b) => b.created - a.created
    );

    setNotifications(combined);
  };

  // LIVE UPDATE
  useEffect(() => {
    loadNotifications();

    const handleStorage = () =>
      loadNotifications();

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () =>
      window.removeEventListener(
        "storage",
        handleStorage
      );
  }, []);

  // OPEN
  const openNotification = (type) => {
    if (type === "booking") {
      setActive("inbox");
    }

    if (type === "chat") {
      setActive("chat");
    }
  };

  return (
    <div>
      <h2 style={styles.title}>
        🔔 Notification Center
      </h2>

      {notifications.length === 0 ? (
        <div style={styles.empty}>
          <h3>No notifications yet</h3>

          <p>
            New bookings and chats will
            appear here.
          </p>
        </div>
      ) : (
        <div style={styles.grid}>
          {notifications.map((n) => (
            <div
              key={n.id}
              style={styles.card}
              onClick={() =>
                openNotification(n.type)
              }
            >
              <div style={styles.top}>
                <div
                  style={{
                    ...styles.badge,
                    background:
                      n.type === "booking"
                        ? "#ffd54f"
                        : "#4caf50",
                  }}
                >
                  {n.type === "booking"
                    ? "BOOKING"
                    : "CHAT"}
                </div>

                <div style={styles.open}>
                  OPEN →
                </div>
              </div>

              <p style={styles.text}>
                {n.text}
              </p>

              <small style={styles.time}>
                {n.time}
              </small>
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
    opacity: 0.8,
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",
    gap: "18px",
  },

  card: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "18px",
    borderRadius: "14px",
    border:
      "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    transition: "0.3s",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
  },

  badge: {
    color: "#000",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "bold",
  },

  open: {
    fontSize: "12px",
    opacity: 0.8,
  },

  text: {
    marginBottom: "10px",
    lineHeight: "1.5",
  },

  time: {
    opacity: 0.7,
    fontSize: "12px",
  },
};