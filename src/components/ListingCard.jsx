export default function ListingCard({ title, location, price }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.text}>{location}</p>
      <p style={styles.price}>KES {price}</p>

      <button style={styles.button}>Book Now</button>
    </div>
  );
}

const styles = {
  card: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(212,175,55,0.4)",
    padding: "20px",
    borderRadius: "16px",
    color: "white",
    backdropFilter: "blur(10px)",
  },

  title: {
    color: "#d4af37",
    marginBottom: "8px",
  },

  text: {
    opacity: 0.8,
    fontSize: "14px",
  },

  price: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#fff",
  },

  button: {
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    background: "#046b3b",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};