import { useState } from "react";

export default function Hostels() {
  const referralLink =
    "https://qwetu.co.ke/referral/AGT-1450-060";

  const hostels = [
    {
      name: "Qwetu Parklands",
      location: "Parklands, Nairobi",
      rooms: [
        { type: "Twin", price: "Ksh 19,000" },
        { type: "Cluster", price: "Ksh 25,500" },
        { type: "Studio", price: "Ksh 29,000" },
        { type: "Premium", price: "Ksh 34,000" },
      ],
    },

    {
      name: "Qwetu Ruaraka & Jogoo Road",
      location: "Ruaraka / Jogoo Road",
      rooms: [
        { type: "Twin", price: "Ksh 22,000" },
        { type: "Cluster", price: "Ksh 29,000" },
        { type: "Studio", price: "Ksh 31,500" },
        { type: "Premium", price: "Ksh 37,000" },
      ],
    },

    {
      name: "Qwetu Hurlingham",
      location: "Hurlingham, Nairobi",
      rooms: [
        { type: "Twin", price: "Ksh 22,000" },
        { type: "Cluster", price: "Ksh 29,000" },
        { type: "Studio", price: "Ksh 31,500" },
        { type: "Premium", price: "Ksh 37,000" },
      ],
    },

    {
      name: "Qwetu WilsonView",
      location: "Wilson Airport Area",
      rooms: [
        { type: "Twin", price: "Ksh 22,000" },
        { type: "Cluster", price: "Ksh 29,000" },
        { type: "Studio", price: "Ksh 31,500" },
        { type: "Premium", price: "Ksh 37,000" },
      ],
    },

    {
      name: "Qwetu Kasarani Greens",
      location: "Kasarani (Near KU)",
      rooms: [
        { type: "Twin", price: "Ksh 19,000" },
        { type: "Cluster", price: "Ksh 27,000" },
        { type: "Studio", price: "Ksh 29,000" },
        { type: "Premium", price: "Ksh 34,000" },
      ],
    },

    {
      name: "Qwetu Karen",
      location: "Karen (Near CUEA & KSU)",
      rooms: [
        { type: "Twin", price: "Ksh 21,500" },
        { type: "Cluster", price: "Ksh 29,000" },
        { type: "Studio", price: "Ksh 30,500" },
        { type: "Premium", price: "Ksh 36,000" },
      ],
    },

    {
      name: "Qwetu Chiromo",
      location: "Chiromo (Near UON)",
      rooms: [
        { type: "Twin", price: "Ksh 21,500" },
        { type: "Cluster", price: "Ksh 28,500" },
        { type: "Studio", price: "Ksh 31,500" },
        { type: "Premium", price: "Ksh 36,500" },
      ],
    },

    {
      name: "Qwetu Aberdare Heights I & II",
      location: "Aberdare Heights",
      rooms: [
        { type: "Twin", price: "Ksh 22,000" },
        { type: "Cluster", price: "Ksh 29,000" },
        { type: "Studio", price: "Ksh 31,000" },
        { type: "Premium", price: "Ksh 37,000" },
      ],
    },
  ];

  const [search, setSearch] = useState("");

  const filtered = hostels.filter(
    (h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Student Hostels</h1>

      <p style={styles.subtitle}>
        Explore trusted Qwetu student residences across Nairobi.
      </p>

      <input
        type="text"
        placeholder="Search hostel or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.grid}>
        {filtered.map((hostel, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.badge}>
              ⭐ Official Qwetu Partner
            </div>

            <h2 style={styles.hostelName}>
              {hostel.name}
            </h2>

            <p style={styles.location}>
              📍 {hostel.location}
            </p>

            <div style={styles.roomBox}>
              {hostel.rooms.map((room, i) => (
                <div key={i} style={styles.roomRow}>
                  <span>{room.type}</span>

                  <span style={styles.price}>
                    {room.price}
                  </span>
                </div>
              ))}
            </div>

            <button
              style={styles.button}
              onClick={() =>
                window.open(referralLink, "_blank")
              }
            >
              🔗 Book via JNI Referral
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background:
      "linear-gradient(135deg,#022c1a,#046b3b,#000000,#d4af37)",
    color: "white",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center",
    color: "#ffd54f",
    fontSize: "45px",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "30px",
    opacity: 0.85,
  },

  search: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    marginBottom: "35px",
    fontSize: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: "25px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "20px",
    padding: "22px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  badge: {
    display: "inline-block",
    background: "#ffd54f",
    color: "#000",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "15px",
  },

  hostelName: {
    color: "#ffffff",
    marginBottom: "8px",
  },

  location: {
    opacity: 0.85,
    marginBottom: "20px",
  },

  roomBox: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "14px",
    padding: "12px",
    marginBottom: "20px",
  },

  roomRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  price: {
    color: "#ffd54f",
    fontWeight: "bold",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "#ffd54f",
    color: "#000",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
  },
};