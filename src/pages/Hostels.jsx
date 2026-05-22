import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hostels() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
  const loadListings = () => {
    const allListings =
      JSON.parse(localStorage.getItem("jni_listings")) || [];

    const hostelListings = allListings.filter(
      (item) => item.category === "Hostels"
    );

    setListings(hostelListings);
  };

  loadListings();

  window.addEventListener("storage", loadListings);

  return () => {
    window.removeEventListener(
      "storage",
      loadListings
    );
  };
}, []);

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.hero}>
        <h1 style={styles.title}>🏠 Hostels</h1>

        <p style={styles.subtitle}>
          Find student hostels, bedsitters and
          affordable accommodation around Nairobi.
        </p>
      </div>

      {/* PARTNER SECTION */}
      <h2 style={styles.sectionTitle}>
        ⭐ Partner Hostels
      </h2>

      <div style={styles.partnerGrid}>
        {/* QWETU */}
        <Link
          to="/qwetu-hostels"
          style={styles.partnerCard}
        >
          <h2>QWETU HOSTELS</h2>

          <p>
            Premium student accommodation with
            modern amenities.
          </p>

          <button style={styles.partnerButton}>
            View Listings
          </button>
        </Link>

        {/* QEJANI */}
        <Link
          to="/qejani-hostels"
          style={styles.partnerCard}
        >
          <h2>QEJANI HOSTELS</h2>

          <p>
            Affordable and secure hostels near
            universities.
          </p>

          <button style={styles.partnerButton}>
            View Listings
          </button>
        </Link>

        {/* OTHER HOSTELS */}
        <Link
          to="/other-hostels"
          style={styles.partnerCard}
        >
          <h2>OTHER HOSTELS</h2>

          <p>
            Explore more hostels across Nairobi.
          </p>

          <button style={styles.partnerButton}>
            Browse Hostels
          </button>
        </Link>
      </div>

      {/* ADMIN LISTINGS */}
      <h2 style={styles.sectionTitle}>
        🆕 Latest Hostel Listings
      </h2>

      {listings.length === 0 ? (
        <div style={styles.empty}>
          <h3>No hostel listings yet.</h3>

          <p>
            Admin-added hostel listings will
            appear here automatically.
          </p>
        </div>
      ) : (
        <div style={styles.grid}>
          {listings.map((item) => (
            <div
  key={item.id}
  style={styles.card}
  onMouseEnter={(e) =>
    (e.currentTarget.style.transform =
      "translateY(-4px)")
  }
  onMouseLeave={(e) =>
    (e.currentTarget.style.transform =
      "translateY(0px)")
  }
>
              {/* IMAGE */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  style={styles.image}
                />
              ) : (
                <div style={styles.placeholder}>
                  No Image
                </div>
              )}

              {/* DETAILS */}
              <div style={styles.cardContent}>
                <h3>{item.title}</h3>

                <p>📍 {item.location}</p>

                <p>🛏️ {item.roomType}</p>

                <p>💰 {item.price}</p>

                <a
  href={`https://wa.me/254111565424?text=Hello,%20I%20want%20to%20book%20Hostel%20${item.title}`}
  target="_blank"
  rel="noreferrer"
>
  <button style={styles.bookButton}>
    Book Now
  </button>
</a>
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
    minHeight: "100vh",
    padding: "30px",
    background:
      "linear-gradient(135deg,#033d24,#046b3b,#000,#d4af37)",
    color: "white",
    fontFamily: "Arial",
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
    opacity: 0.85,
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: "1.6",
  },

  sectionTitle: {
    color: "#ffd54f",
    marginTop: "40px",
    marginBottom: "20px",
  },

  partnerGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
  },

  partnerCard: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "25px",
    textDecoration: "none",
    color: "white",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "0.3s",
  },

  partnerButton: {
    marginTop: "15px",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#ffd54f",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  },

  empty: {
    background: "rgba(255,255,255,0.08)",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
  },

  grid: {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "18px",
},

  card: {
  background: "rgba(255,255,255,0.08)",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.1)",
  transition: "0.3s",
  cursor: "pointer",
},

  image: {
  width: "100%",
  height: "160px",
  objectFit: "cover",
},

  placeholder: {
  height: "160px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(255,255,255,0.06)",
},

  cardContent: {
  padding: "12px",
},

  bookButton: {
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#ffd54f",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  },
};