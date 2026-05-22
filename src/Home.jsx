import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chat from "./pages/Chat";

export default function Home() {
  const [activeView, setActiveView] = useState("home");
  const [listings, setListings] = useState([]);
  const [unreadChats, setUnreadChats] = useState(0);

  const categories = [
    { name: "Hotels", path: "/hotels", icon: "🏨" },
    { name: "Motels", path: "/motels", icon: "🛣️" },
    { name: "Hostels", path: "/hostels", icon: "🏠" },
    { name: "Apartments", path: "/apartments", icon: "🏢" },
    { name: "Airbnb Stays", path: "/airbnb", icon: "🛌" },
    { name: "Vacation Homes", path: "/vacation-homes", icon: "🌴" },
    { name: "Resorts", path: "/resorts", icon: "🌊" },
    { name: "Guest Houses", path: "/guest-houses", icon: "🏡" },
    { name: "Meeting Rooms", path: "/meeting-rooms", icon: "📋" },
    { name: "Office Spaces", path: "/office-spaces", icon: "💼" },
    { name: "Event Venues", path: "/event-venues", icon: "🎉" },
    { name: "Conference Rooms", path: "/conference-rooms", icon: "🧑‍💼" },
    { name: "Studio Rentals", path: "/studio-rentals", icon: "🎬" },
  ];

  /* LOAD LISTINGS */
  useEffect(() => {
    const loadListings = () => {
      const saved =
        JSON.parse(localStorage.getItem("jni_listings")) || [];

      setListings(saved);
    };

    loadListings();

    window.addEventListener("storage", loadListings);

    return () => {
      window.removeEventListener("storage", loadListings);
    };
  }, []);

  /* LOAD CHAT NOTIFICATIONS */
  useEffect(() => {
    const loadChats = () => {
      const chats =
        JSON.parse(localStorage.getItem("jni_chat")) || [];

      const adminReplies = chats.filter(
        (msg) =>
          msg.sender === "admin" &&
          !msg.read
      );

      setUnreadChats(adminReplies.length);
    };

    loadChats();

    window.addEventListener("storage", loadChats);

    return () => {
      window.removeEventListener("storage", loadChats);
    };
  }, []);

  /* OPEN CHAT + MARK READ */
  const openChat = () => {
    setActiveView("chat");

    const chats =
      JSON.parse(localStorage.getItem("jni_chat")) || [];

    const updated = chats.map((msg) =>
      msg.sender === "admin"
        ? { ...msg, read: true }
        : msg
    );

    localStorage.setItem(
      "jni_chat",
      JSON.stringify(updated)
    );

    setUnreadChats(0);
  };

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <div style={styles.logoBox}>
          <h2 style={styles.logo}>JNI</h2>

          <p style={styles.logoText}>
            Multipurpose
          </p>
        </div>

        <button
          style={styles.sideItem}
          onClick={() => setActiveView("home")}
        >
          🏠 Home
        </button>

        <button
          style={styles.sideItem}
          onClick={() => setActiveView("gallery")}
        >
          🖼️ Gallery
        </button>

        <button
          style={styles.sideItem}
          onClick={openChat}
        >
          💬 Chat
          {unreadChats > 0 && (
            <span style={styles.badge}>
              {unreadChats}
            </span>
          )}
        </button>

        <button
          style={styles.sideItem}
          onClick={() => setActiveView("contact")}
        >
          📞 Contact
        </button>

        <button
  style={styles.sideItem}
  onClick={() => {
    localStorage.removeItem("jni_logged_in");
    window.location.href = "/login";
  }}
>
  🚪 Logout
</button>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.content}>
        {/* HOME */}
        {activeView === "home" && (
          <>
            <div style={styles.hero}>
              <h1 style={styles.title}>
                JNI Multipurpose
              </h1>

              <p style={styles.subtitle}>
                Find premium accommodation,
                event spaces, offices and
                rentals around Nairobi.
              </p>
            </div>

            <div style={styles.grid}>
              {categories.map((c) => (
                <Link
                  key={c.name}
                  to={c.path}
                  style={styles.categoryCard}
                >
                  <div style={styles.categoryIcon}>
                    {c.icon}
                  </div>

                  <h3 style={styles.categoryTitle}>
                    {c.name}
                  </h3>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* GALLERY */}
        {activeView === "gallery" && (
          <>
            <h2 style={styles.sectionTitle}>
              🖼️ Property Gallery
            </h2>

            {listings.length === 0 ? (
              <div style={styles.empty}>
                No listings available yet.
              </div>
            ) : (
              <div style={styles.galleryGrid}>
                {listings.map((item) => (
                  <div
                    key={item.id}
                    style={styles.galleryCard}
                  >
                    {/* IMAGE */}
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        style={styles.galleryImage}
                      />
                    ) : (
                      <div style={styles.noImage}>
                        No Image
                      </div>
                    )}

                    {/* DETAILS */}
                    <div style={styles.galleryContent}>
                      <h3 style={styles.galleryTitle}>
                        {item.title}
                      </h3>

                      <p style={styles.text}>
                        📍 {item.location}
                      </p>

                      <p style={styles.text}>
                        🏷️ {item.category}
                      </p>

                      <p style={styles.text}>
                        🛏️ {item.roomType}
                      </p>

                      <p style={styles.price}>
                        💰 {item.price}
                      </p>

                      {item.description && (
                        <p style={styles.description}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* CHAT */}
        {activeView === "chat" && (
          <Chat />
        )}

        {/* CONTACT */}
        {activeView === "contact" && (
          <div style={styles.contactCard}>
            <h2 style={styles.sectionTitle}>
              📞 Contact Us
            </h2>

            <p style={styles.contactText}>
              📱 Phone:
              +254 702 551 560
            </p>

            <p style={styles.contactText}>
              💬 WhatsApp:
              +254 111 564 424
            </p>

            <p style={styles.contactText}>
              📧 Email:
              support@jni.com
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#033d24,#046b3b,#000,#d4af37)",
    color: "white",
    fontFamily: "Arial",
  },

  /* SIDEBAR */
  sidebar: {
    width: "230px",
    background: "rgba(0,0,0,0.85)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
    borderRight: "1px solid rgba(255,255,255,0.1)",
  },

  logoBox: {
    marginBottom: "30px",
    textAlign: "center",
  },

  logo: {
    color: "#ffd54f",
    marginBottom: "2px",
  },

  logoText: {
    opacity: 0.8,
    fontSize: "14px",
  },

  sideItem: {
    padding: "14px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "none",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    textAlign: "left",
    cursor: "pointer",
    position: "relative",
    fontSize: "15px",
  },

  badge: {
    position: "absolute",
    right: "12px",
    top: "10px",
    background: "crimson",
    borderRadius: "50%",
    minWidth: "20px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "11px",
    fontWeight: "bold",
  },

  /* CONTENT */
  content: {
    flex: 1,
    marginLeft: "230px",
    padding: "30px",
  },

  hero: {
    textAlign: "center",
    marginBottom: "40px",
  },

  title: {
    fontSize: "42px",
    color: "#ffd54f",
    marginBottom: "10px",
  },

  subtitle: {
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: "1.6",
    opacity: 0.9,
  },

  sectionTitle: {
    color: "#ffd54f",
    marginBottom: "25px",
  },

  /* CATEGORY GRID */
  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px",
  },

  categoryCard: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "25px",
    textDecoration: "none",
    color: "white",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "0.3s",
  },

  categoryIcon: {
    fontSize: "34px",
    marginBottom: "12px",
  },

  categoryTitle: {
    fontSize: "16px",
  },

  /* GALLERY */
  galleryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(230px,1fr))",
    gap: "18px",
  },

  galleryCard: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "14px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  galleryImage: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
  },

  noImage: {
    height: "160px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255,255,255,0.05)",
  },

  galleryContent: {
    padding: "14px",
  },

  galleryTitle: {
    fontSize: "16px",
    marginBottom: "10px",
  },

  text: {
    fontSize: "13px",
    marginBottom: "6px",
    opacity: 0.9,
  },

  price: {
    marginTop: "8px",
    color: "#ffd54f",
    fontWeight: "bold",
  },

  description: {
    marginTop: "10px",
    fontSize: "12px",
    opacity: 0.75,
    lineHeight: "1.5",
  },

  empty: {
    background: "rgba(255,255,255,0.08)",
    padding: "30px",
    borderRadius: "14px",
    textAlign: "center",
  },

  /* CONTACT */
  contactCard: {
    background: "rgba(255,255,255,0.08)",
    padding: "25px",
    borderRadius: "16px",
    maxWidth: "500px",
  },

  contactText: {
    marginBottom: "14px",
    lineHeight: "1.6",
  },
};