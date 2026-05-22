import { useState } from "react";

export default function QejaniHostels() {
  const referralLink =
    "https://qejani.co.ke/referral/AGT-1450-060";

  const hostels = [
    {
      name: "Qejani Kaskazini Greens",
      location: "Near Kenyatta University",
      rooms: [
        { type: "Quadruple", price: "Ksh 12,500" },
        { type: "Trio", price: "Ksh 13,500" },
        { type: "Double", price: "Ksh 15,500" },
        { type: "Superior Double", price: "Ksh 16,500" },
        { type: "Single", price: "Ksh 18,000" },
      ],
    },

    {
      name: "Qejani Buffalo Hills",
      location: "Near JKUAT Jomo Kenyatta Uni",
      rooms: [
        { type: "Quadruple", price: "Ksh 12,500" },
        { type: "Trio", price: "Ksh 13,500" },
        { type: "Double", price: "Ksh 15,500" },
        { type: "Superior Double", price: "Ksh 16,500" },
        { type: "Single", price: "Ksh 18,000" },
      ],
    },

    {
      name: "Qejani Karen",
      location: "Karen (Near CUEA)",
      rooms: [
        { type: "Quadruple", price: "Ksh 12,500" },
        { type: "Trio", price: "Ksh 13,500" },
        { type: "Double", price: "Ksh 15,500" },
        { type: "Superior Double", price: "Ksh 16,500" },
        { type: "Single", price: "Ksh 18,000" },
      ],
    },

    {
    name: "Qejani Hurlingham",
    location: "(Near Total Hurlingham)",
    rooms: [
      { type: "Quadruple - Ksh 12,500"},
      { type:"Triple - Ksh 13,500"},
      { type:"Double - Ksh 15,500"},
      { type:"Superior Double - Ksh 16,500"},
      { type:"Single - Ksh 18,000"},
    ],
  },

    {
      name: "Qejani Chiromo",
      location: "Chiromo (Near UON University of Nairobi)",
      rooms: [
        { type: "Quadruple", price: "Ksh 12,500" },
        { type: "Trio", price: "Ksh 13,500" },
        { type: "Double", price: "Ksh 15,500" },
        { type: "Superior Double", price: "Ksh 16,500" },
        { type: "Single", price: "Ksh 18,000" },
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
      <h1 style={styles.title}>Qejani Hostels</h1>

      <p style={styles.subtitle}>
        Explore premium Qejani student residences.
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
              ⭐ Official Qejani Partner
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
      "linear-gradient(135deg,#0b1d51,#1e3c72,#000,#ff7b00)",
    color: "white",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center",
    color: "#ffb347",
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
    background: "#ff7b00",
    color: "white",
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
    color: "#ffb347",
    fontWeight: "bold",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "#ff7b00",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
  },
};