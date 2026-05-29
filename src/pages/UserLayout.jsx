import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Chat from "../pages/Chat";

export default function UserLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [unreadChats, setUnreadChats] = useState(0);
  const navigate = useNavigate();

  const isMobile = window.innerWidth < 768;

  /* CHAT NOTIFICATIONS */
  useEffect(() => {
    const loadChats = () => {
      const chats = JSON.parse(localStorage.getItem("jni_chat")) || [];
      const currentUser = JSON.parse(localStorage.getItem("jni_user"))?.email || "";

      const unread = chats.filter(
        (msg) =>
          msg.sender === "admin" &&
          msg.userEmail === currentUser &&
          !msg.read
      );

      setUnreadChats(unread.length);
    };

    loadChats();
    window.addEventListener("storage", loadChats);

    return () => window.removeEventListener("storage", loadChats);
  }, []);

  /* LOGOUT CONFIRM */
  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;

    localStorage.removeItem("jni_user");
    localStorage.removeItem("jni_token");

    navigate("/login");
  };

  const menu = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Gallery", path: "/gallery", icon: "🖼️" },
    { name: "Chat", path: "/chat", icon: "💬", badge: unreadChats },
    { name: "Contact", path: "/contact", icon: "📞" },
  ];

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <div
        style={{
          ...styles.sidebar,
          width: collapsed ? "70px" : "230px",
        }}
      >
        <div style={styles.logoBox}>
          <h2 style={styles.logo}>JNI</h2>

          <button
            onClick={() => setCollapsed(!collapsed)}
            style={styles.collapseBtn}
          >
            {collapsed ? "➡️" : "⬅️"}
          </button>
        </div>

        {menu.map((item) => (
          <Link key={item.name} to={item.path} style={styles.link}>
            <span>{item.icon}</span>

            {!collapsed && <span style={{ marginLeft: "10px" }}>{item.name}</span>}

            {item.badge > 0 && (
              <span style={styles.badge}>{item.badge}</span>
            )}
          </Link>
        ))}

        <button onClick={handleLogout} style={styles.logout}>
          🚪 {!collapsed && "Logout"}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          ...styles.content,
          marginLeft: collapsed ? "70px" : "230px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#000",
    color: "white",
    fontFamily: "Arial",
  },

  sidebar: {
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    background: "#111",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    transition: "0.3s",
  },

  logoBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  logo: {
    color: "#ffd54f",
  },

  collapseBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "18px",
  },

  link: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    marginBottom: "8px",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    position: "relative",
  },

  badge: {
    position: "absolute",
    right: "10px",
    background: "red",
    borderRadius: "50%",
    padding: "3px 7px",
    fontSize: "11px",
  },

  logout: {
    marginTop: "auto",
    padding: "12px",
    background: "crimson",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  content: {
    flex: 1,
    padding: "20px",
  },
};