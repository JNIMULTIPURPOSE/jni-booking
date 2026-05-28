import { useEffect, useState } from "react";
import Inbox from "./Inbox";
import Listings from "./Listings";
import AdminChat from "./AdminChat";
import NotificationCenter from "./NotificationCenter";
import axios from "axios";

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");

  const [stats, setStats] = useState({
    users: 0,
    listings: 0,
    bookings: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingCount, setPendingCount] = useState(0);
  const [chatCount, setChatCount] = useState(0);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  /* ================= SCREEN SIZE ================= */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= TOKEN HELPER ================= */
  const getToken = () => {
    return localStorage.getItem("jni_admin_token");
  };

  /* ================= FETCH LIVE STATS ================= */
  const fetchStats = async () => {
    try {
      const token = getToken();

      console.log("TOKEN:", token);

      if (!token) {
        setError("No admin token found. Please login again.");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        "https://jni-backend.onrender.com/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats({
        users: res.data.users || 0,
        listings: res.data.listings || 0,
        bookings: res.data.bookings || 0,
      });

      setPendingCount(res.data.pending || 0);
      setChatCount(res.data.unreadChats || 0);

      setError("");
    } catch (error) {
      console.log("DASHBOARD ERROR:", error.response?.data || error.message);
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  /* ================= AUTO REFRESH ================= */
  useEffect(() => {
    fetchStats();

    const interval = setInterval(() => {
      fetchStats();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ================= RENDER CONTENT ================= */
  const renderContent = () => {
    if (active === "inbox") return <Inbox />;
    if (active === "listings") return <Listings />;
    if (active === "chat") return <AdminChat />;

    if (active === "notifications") {
      return <NotificationCenter setActive={setActive} />;
    }

    return (
      <div style={styles.welcomeCard}>
        <h2>Welcome to JNI Admin Panel</h2>
        <p>Manage bookings, chats, listings and users from one place.</p>
      </div>
    );
  };

  /* ================= LOADING ================= */
  if (loading) {
    return <div style={styles.loading}>Loading dashboard...</div>;
  }

  /* ================= ERROR ================= */
  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div
        style={{
          ...styles.sidebar,
          ...(isMobile && styles.mobileSidebar),
        }}
      >
        <div>
          <h2 style={styles.logo}>JNI Admin</h2>

          <button onClick={() => setActive("dashboard")} style={styles.link}>
            📊 Dashboard
          </button>

          <button onClick={() => setActive("inbox")} style={styles.link}>
            <span>📥 Inbox</span>
            {pendingCount > 0 && (
              <span style={styles.badge}>{pendingCount}</span>
            )}
          </button>

          <button onClick={() => setActive("listings")} style={styles.link}>
            🏠 Listings
          </button>

          <button onClick={() => setActive("chat")} style={styles.link}>
            <span>💬 Chat</span>
            {chatCount > 0 && (
              <span style={styles.badge}>{chatCount}</span>
            )}
          </button>

          <button
            onClick={() => setActive("notifications")}
            style={styles.link}
          >
            <span>🔔 Notifications</span>
            {chatCount > 0 && (
              <span style={styles.badge}>{chatCount}</span>
            )}
          </button>
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem("jni_admin");
            localStorage.removeItem("jni_admin_token");
            window.location.href = "/admin-login";
          }}
          style={styles.logout}
        >
          🚪 Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          ...styles.content,
          ...(isMobile && styles.mobileContent),
        }}
      >
        <h1 style={styles.title}>Admin Dashboard</h1>

        {/* STATS */}
        <div
          style={{
            ...styles.statsGrid,
            ...(isMobile && styles.mobileStatsGrid),
          }}
        >
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>{stats.users}</h3>
            <p>👤 Total Users</p>
          </div>

          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>{stats.listings}</h3>
            <p>🏠 Listings</p>
          </div>

          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>{stats.bookings}</h3>
            <p>📅 Bookings</p>
          </div>

          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>{pendingCount}</h3>
            <p>📥 Pending</p>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div
          style={{
            ...styles.pageContent,
            ...(isMobile && styles.mobilePageContent),
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    minHeight: "100vh",
    fontFamily: "Arial",
    background: "#01150d",
  },

  /* SIDEBAR */
  sidebar: {
    width: "250px",
    minWidth: "250px",
    background: "#022c1a",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight:
      "1px solid rgba(255,255,255,0.08)",
    boxSizing: "border-box",
  },

  logo: {
    color: "#ffd54f",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "bold",
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
    boxSizing: "border-box",
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
    width: "100%",
    boxSizing: "border-box",
  },

  /* CONTENT */
  content: {
    flex: 1,
    minWidth: "300px",
    padding: "30px",
    background:
      "linear-gradient(135deg,#033d24,#046b3b,#000,#d4af37)",
    color: "white",
    overflowY: "auto",
    boxSizing: "border-box",
  },

  title: {
    color: "#ffd54f",
    marginBottom: "25px",
    fontSize: "32px",
    fontWeight: "bold",
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
    boxSizing: "border-box",
  },

  statNumber: {
    fontSize: "34px",
    color: "#ffd54f",
    marginBottom: "10px",
    fontWeight: "bold",
  },

  pageContent: {
    background:
      "rgba(0,0,0,0.2)",
    borderRadius: "20px",
    padding: "20px",
    minHeight: "400px",
    boxSizing: "border-box",
  },

  welcomeCard: {
    background:
      "rgba(255,255,255,0.06)",
    padding: "30px",
    borderRadius: "16px",
    lineHeight: "1.7",
    boxSizing: "border-box",
  },

  mobileSidebar: {
  width: "100%",
  minWidth: "100%",
  borderRight: "none",
  borderBottom:
    "1px solid rgba(255,255,255,0.08)",
},

mobileContent: {
  width: "100%",
  minWidth: "100%",
  padding: "15px",
},

mobileStatsGrid: {
  gridTemplateColumns: "1fr",
},

mobilePageContent: {
  padding: "12px",
},

loading: {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "20px",
},

error: {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "red",
  fontSize: "18px",
},
};