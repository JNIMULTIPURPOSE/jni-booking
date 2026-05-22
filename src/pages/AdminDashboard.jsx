import { useState, useEffect } from "react";
import Inbox from "./Inbox";
import Listings from "./Listings";
import AdminChat from "./AdminChat";
import NotificationCenter from "./NotificationCenter";
import axios from "axios";

export default function AdminDashboard() {
  const [active, setActive] = useState("inbox");

  const [pendingCount, setPendingCount] =
    useState(0);

  const [chatCount, setChatCount] =
    useState(0);

  const [stats, setStats] = useState({
    users: 0,
    listings: 0,
    bookings: 0,
  });

  /* ================= LOAD DASHBOARD STATS ================= */
  useEffect(() => {
    fetchDashboardStats();

    loadLocalCounts();

    window.addEventListener(
      "storage",
      loadLocalCounts
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadLocalCounts
      );
    };
  }, []);

  /* ================= API STATS ================= */
  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get(
        "https://jni-backend.onrender.com/api/admin/stats"
      );

      setStats(res.data);

    } catch (err) {
      console.log(
        "Dashboard stats error",
        err
      );
    }
  };

  /* ================= LOCAL COUNTS ================= */
  const loadLocalCounts = () => {
    // BOOKINGS
    const bookings =
      JSON.parse(
        localStorage.getItem("jni_bookings")
      ) || [];

    const pending = bookings.filter(
      (b) => b.status === "Pending"
    ).length;

    setPendingCount(pending);

    // CHATS
    const chats =
      JSON.parse(
        localStorage.getItem("jni_chat")
      ) || [];

    const unread = chats.filter(
      (c) =>
        c.sender !== "admin" &&
        !c.read
    ).length;

    setChatCount(unread);
  };

  /* ================= RENDER PAGES ================= */
  const renderContent = () => {
    if (active === "inbox") {
      return <Inbox />;
    }

    if (active === "listings") {
      return <Listings />;
    }

    if (active === "chat") {
      return <AdminChat />;
    }

    if (active === "notifications") {
      return (
        <NotificationCenter
          setActive={setActive}
        />
      );
    }

    return (
      <div style={styles.welcomeCard}>
        <h2>
          Welcome to JNI Admin Panel
        </h2>

        <p>
          Manage bookings, chats,
          listings and users from one
          place.
        </p>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* ================= SIDEBAR ================= */}
      <div style={styles.sidebar}>
        <div>
          <h2 style={styles.logo}>
            JNI Admin
          </h2>

          {/* DASHBOARD */}
          <button
            onClick={() =>
              setActive("dashboard")
            }
            style={styles.link}
          >
            📊 Dashboard
          </button>

          {/* INBOX */}
          <button
            onClick={() =>
              setActive("inbox")
            }
            style={styles.link}
          >
            <span>📥 Inbox</span>

            {pendingCount > 0 && (
              <span style={styles.badge}>
                {pendingCount}
              </span>
            )}
          </button>

          {/* LISTINGS */}
          <button
            onClick={() =>
              setActive("listings")
            }
            style={styles.link}
          >
            🏠 Listings
          </button>

          {/* CHAT */}
          <button
            onClick={() =>
              setActive("chat")
            }
            style={styles.link}
          >
            <span>💬 Chat</span>

            {chatCount > 0 && (
              <span style={styles.badge}>
                {chatCount}
              </span>
            )}
          </button>

          {/* NOTIFICATIONS */}
          <button
            onClick={() =>
              setActive("notifications")
            }
            style={styles.link}
          >
            🔔 Notifications
          </button>
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem(
              "jni_admin"
            );

            localStorage.removeItem(
              "jni_admin_token"
            );

            window.location.href =
              "/admin-login";
          }}
          style={styles.logout}
        >
          🚪 Logout
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div style={styles.content}>
        <h1 style={styles.title}>
          Admin Dashboard
        </h1>

        {/* ================= STATS ================= */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>
              {stats.users}
            </h3>

            <p>👤 Total Users</p>
          </div>

          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>
              {stats.listings}
            </h3>

            <p>🏠 Listings</p>
          </div>

          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>
              {stats.bookings}
            </h3>

            <p>📅 Bookings</p>
          </div>

          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>
              {pendingCount}
            </h3>

            <p>📥 Pending</p>
          </div>
        </div>

        {/* ================= PAGE CONTENT ================= */}
        <div style={styles.pageContent}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial",
    background: "#01150d",
  },

  /* SIDEBAR */
  sidebar: {
    width: "250px",
    background: "#022c1a",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight:
      "1px solid rgba(255,255,255,0.08)",
  },

  logo: {
    color: "#ffd54f",
    textAlign: "center",
    marginBottom: "30px",
  },

  link: {
    width: "100%",
    padding: "14px",
    marginBottom: "14px",
    background:
      "rgba(255,255,255,0.05)",
    border:
      "1px solid rgba(255,213,79,0.3)",
    color: "white",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "0.3s",
  },

  badge: {
    background: "#ffd54f",
    color: "#000",
    borderRadius: "50%",
    minWidth: "24px",
    height: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    fontWeight: "bold",
  },

  logout: {
    padding: "14px",
    background: "crimson",
    border: "none",
    color: "white",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  /* CONTENT */
  content: {
    flex: 1,
    padding: "30px",
    background:
      "linear-gradient(135deg,#033d24,#046b3b,#000,#d4af37)",
    color: "white",
    overflowY: "auto",
  },

  title: {
    color: "#ffd54f",
    marginBottom: "25px",
  },

  /* STATS */
  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  statCard: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "25px",
    borderRadius: "18px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(8px)",
  },

  statNumber: {
    fontSize: "34px",
    color: "#ffd54f",
    marginBottom: "10px",
  },

  pageContent: {
    background:
      "rgba(0,0,0,0.2)",
    borderRadius: "20px",
    padding: "20px",
    minHeight: "400px",
  },

  welcomeCard: {
    background:
      "rgba(255,255,255,0.06)",
    padding: "30px",
    borderRadius: "16px",
    lineHeight: "1.7",
  },
};