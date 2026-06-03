import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chat from "./pages/Chat";

export default function Home() {
  const [activeView, setActiveView] =
    useState("home");

  const [listings, setListings] =
    useState([]);

  const [unreadChats, setUnreadChats] =
    useState(0);

  const isMobile =
    window.innerWidth < 768;

  const categories = [
    {
      name: "Hotels",
      path: "/hotels",
      icon: "🏨",
    },

    {
      name: "Motels",
      path: "/motels",
      icon: "🛣️",
    },

    {
      name: "Hostels",
      path: "/hostels",
      icon: "🏠",
    },

    {
      name: "Apartments",
      path: "/apartments",
      icon: "🏢",
    },

    {
      name: "Airbnb Stays",
      path: "/airbnb",
      icon: "🛌",
    },

    {
      name: "Vacation Homes",
      path: "/vacation-homes",
      icon: "🌴",
    },

    {
      name: "Resorts",
      path: "/resorts",
      icon: "🌊",
    },

    {
      name: "Guest Houses",
      path: "/guest-houses",
      icon: "🏡",
    },

    {
      name: "Meeting Rooms",
      path: "/meeting-rooms",
      icon: "📋",
    },

    {
      name: "Office Spaces",
      path: "/office-spaces",
      icon: "💼",
    },

    {
      name: "Event Venues",
      path: "/event-venues",
      icon: "🎉",
    },

    {
      name: "Conference Rooms",
      path: "/conference-rooms",
      icon: "🧑‍💼",
    },

    {
      name: "Studio Rentals",
      path: "/studio-rentals",
      icon: "🎬",
    },
  ];

  /* LOAD LISTINGS */
  useEffect(() => {
    const loadListings = () => {
      const saved =
        JSON.parse(
          localStorage.getItem(
            "jni_listings"
          )
        ) || [];

      setListings(saved);
    };

    loadListings();

    window.addEventListener(
      "storage",
      loadListings
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadListings
      );
    };
  }, []);

  /* LOAD CHAT NOTIFICATIONS */
  useEffect(() => {
    const loadChats = () => {
      const chats =
        JSON.parse(
          localStorage.getItem(
            "jni_chat"
          )
        ) || [];

      const currentUser =
        JSON.parse(
          localStorage.getItem(
            "jni_user"
          )
        )?.email || "";

      const adminReplies =
        chats.filter(
          (msg) =>
            msg.sender === "admin" &&
            msg.userEmail ===
              currentUser &&
            !msg.read
        );

      setUnreadChats(
        adminReplies.length
      );
    };

    loadChats();

    window.addEventListener(
      "storage",
      loadChats
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadChats
      );
    };
  }, []);

  /* OPEN CHAT + MARK READ */
  const openChat = () => {
    setActiveView("chat");

    const chats =
      JSON.parse(
        localStorage.getItem(
          "jni_chat"
        )
      ) || [];

    const currentUser =
      JSON.parse(
        localStorage.getItem(
          "jni_user"
        )
      )?.email || "";

    const updated = chats.map((msg) =>
      msg.sender === "admin" &&
      msg.userEmail === currentUser
        ? {
            ...msg,
            read: true,
          }
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
      <div
        style={{
          ...styles.sidebar,
          ...(isMobile
            ? styles.mobileSidebar
            : {}),
        }}
      >
        <div style={styles.logoBox}>
          <h2 style={styles.logo}>
            JNI
          </h2>

          <p style={styles.logoText}>
            Multipurpose
          </p>
        </div>

        <button
          style={styles.sideItem}
          onClick={() =>
            setActiveView("home")
          }
        >
          🏠 Home
        </button>

        <button
          style={styles.sideItem}
          onClick={() =>
            setActiveView("gallery")
          }
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
          onClick={() =>
            setActiveView("contact")
          }
        >
          📞 Contact
        </button>

        <button
          style={styles.sideItem}
          onClick={() => {
            localStorage.removeItem(
              "jni_user"
            );

            localStorage.removeItem(
              "jni_token"
            );

            window.location.href =
              "/login";
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          ...styles.content,
          ...(isMobile
            ? styles.mobileContent
            : {}),
        }}
      >
        {/* HOME */}
        {activeView === "home" && (
          <>
            <div style={styles.hero}>
              <h1 style={styles.title}>
                JNI Multipurpose
              </h1>

              <p style={styles.subtitle}>
                Find premium
                accommodation, event
                spaces, offices and
                rentals around Nairobi.
              </p>
            </div>

            <div style={styles.grid}>
              {categories.map((c) => (
                <Link
                  key={c.name}
                  to={c.path}
                  style={
                    styles.categoryCard
                  }
                >
                  <div
                    style={
                      styles.categoryIcon
                    }
                  >
                    {c.icon}
                  </div>

                  <h3
                    style={
                      styles.categoryTitle
                    }
                  >
                    {c.name}
                  </h3>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* GALLERY */}
        {activeView ===
          "gallery" && (
          <>
            <h2
              style={
                styles.sectionTitle
              }
            >
              🖼️ Property Gallery
            </h2>

            {listings.length ===
            0 ? (
              <div style={styles.empty}>
                No listings available
                yet.
              </div>
            ) : (
              <div
                style={
                  styles.galleryGrid
                }
              >
                {listings.map(
                  (item) => (
                    <div
                      key={
                        item._id ||
                        item.id
                      }
                      style={
                        styles.galleryCard
                      }
                    >
                      {/* IMAGE */}
                      {item.image ? (
                        <img
                          src={
                            item.image
                          }
                          alt={
                            item.title
                          }
                          style={{
                            ...styles.galleryImage,
                            height:
                              isMobile
                                ? "140px"
                                : "180px",
                          }}
                        />
                      ) : (
                        <div
                          style={
                            styles.noImage
                          }
                        >
                          No Image
                        </div>
                      )}

                      {/* DETAILS */}
                      <div
                        style={{
                          ...styles.galleryContent,
                          padding:
                            isMobile
                              ? "16px"
                              : "25px",
                        }}
                      >
                        <h3
                          style={
                            styles.galleryTitle
                          }
                        >
                          {item.title}
                        </h3>

                        <p
                          style={
                            styles.text
                          }
                        >
                          📍{" "}
                          {
                            item.location
                          }
                        </p>

                        <p
                          style={
                            styles.text
                          }
                        >
                          🏷️{" "}
                          {
                            item.category
                          }
                        </p>

                        <p
                          style={
                            styles.text
                          }
                        >
                          🛏️{" "}
                          {
                            item.roomType
                          }
                        </p>

                        <p
                          style={
                            styles.price
                          }
                        >
                          💰{" "}
                          {item.price}
                        </p>

                        {item.description && (
                          <p
                            style={
                              styles.description
                            }
                          >
                            {
                              item.description
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}

        {/* CHAT */}
        {activeView === "chat" && (
          <Chat />
        )}

        {/* CONTACT */}
        {activeView ===
          "contact" && (
          <div
            style={{
              ...styles.contactCard,
              padding: isMobile
                ? "16px"
                : "25px",
            }}
          >
            <h2
              style={
                styles.sectionTitle
              }
            >
              📞 Contact Us
            </h2>

            <p
              style={
                styles.contactText
              }
            >
              📱 Phone:
              +254 792 822620
            </p>

            <p
              style={
                styles.contactText
              }
            >
              📱 Phone:
              +254 701 444418
            </p>

            <p
              style={
                styles.contactText
              }
            >
              💬 WhatsApp:
              +254 111 564424
            </p>

            <p
              style={
                styles.contactText
              }
            >
              📧 Email:
              jnimultipurpose001@gmail.com
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
    flexWrap: "wrap",
    overflowX: "hidden",
  },

  /* SIDEBAR */
  sidebar: {
    width: "230px",
    minWidth: "230px",
    background: "rgba(0,0,0,0.85)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
    borderRight:
      "1px solid rgba(255,255,255,0.1)",
    overflowY: "auto",
  },

  mobileSidebar: {
    position: "relative",
    width: "100%",
    minWidth: "100%",
    height: "auto",
    borderRight: "none",
    borderBottom:
      "1px solid rgba(255,255,255,0.1)",
  },

  logoBox: {
    marginBottom: "30px",
    textAlign: "center",
  },

  logo: {
    color: "#ffd54f",
    marginBottom: "2px",
    fontSize: "clamp(24px,5vw,34px)",
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
    background:
      "rgba(255,255,255,0.08)",
    color: "white",
    textAlign: "left",
    cursor: "pointer",
    position: "relative",
    fontSize: "15px",
    width: "100%",
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
    width: "100%",
    boxSizing: "border-box",
  },

  mobileContent: {
    marginLeft: "0",
    padding: "15px",
  },

  hero: {
    textAlign: "center",
    marginBottom: "40px",
    padding: "10px",
  },

  title: {
    fontSize: "clamp(30px,6vw,42px)",
    color: "#ffd54f",
    marginBottom: "10px",
    lineHeight: "1.2",
  },

  subtitle: {
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: "1.6",
    opacity: 0.9,
    fontSize: "clamp(14px,3vw,16px)",
    padding: "0 10px",
  },

  sectionTitle: {
    color: "#ffd54f",
    marginBottom: "25px",
    fontSize: "clamp(22px,5vw,30px)",
  },

  /* CATEGORY GRID */
  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px",
    width: "100%",
  },

  categoryCard: {
    background:
      "rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "25px",
    textDecoration: "none",
    color: "white",
    textAlign: "center",
    border:
      "1px solid rgba(255,255,255,0.1)",
    transition: "0.3s",
    width: "100%",
    boxSizing: "border-box",
  },

  categoryIcon: {
    fontSize: "34px",
    marginBottom: "12px",
  },

  categoryTitle: {
    fontSize: "16px",
    lineHeight: "1.4",
  },

  /* GALLERY */
  galleryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "18px",
    width: "100%",
  },

  galleryCard: {
    background:
      "rgba(255,255,255,0.08)",
    borderRadius: "14px",
    overflow: "hidden",
    border:
      "1px solid rgba(255,255,255,0.08)",
    width: "100%",
  },

  galleryImage: {
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

  galleryContent: {
    padding: "14px",
  },

  galleryTitle: {
    fontSize: "16px",
    marginBottom: "10px",
    lineHeight: "1.4",
  },

  text: {
    fontSize: "13px",
    marginBottom: "6px",
    opacity: 0.9,
    lineHeight: "1.5",
  },

  price: {
    marginTop: "8px",
    color: "#ffd54f",
    fontWeight: "bold",
    fontSize: "15px",
  },

  description: {
    marginTop: "10px",
    fontSize: "12px",
    opacity: 0.75,
    lineHeight: "1.6",
  },

  empty: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "30px",
    borderRadius: "14px",
    textAlign: "center",
    width: "100%",
    boxSizing: "border-box",
  },

  /* CONTACT */
  contactCard: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "25px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "500px",
    boxSizing: "border-box",
  },

  contactText: {
    marginBottom: "14px",
    lineHeight: "1.7",
    fontSize: "14px",
  },
};