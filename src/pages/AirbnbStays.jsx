import ListingCard from "../components/ListingCard";

export default function AirbnbStays() {
  const listings = [
    { title: "Modern Airbnb Loft", location: "Kileleshwa, Nairobi", price: 32000 },
    { title: "City View Studio", location: "CBD Nairobi", price: 22000 },
    { title: "Cozy Airbnb Apartment", location: "Karen, Nairobi", price: 28000 },
  ];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Airbnb Stays</h1>

      <div style={styles.grid}>
        {listings.map((item, i) => (
          <ListingCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    fontFamily: "Arial",
    background: "#000",
    minHeight: "100vh",
    color: "white",
  },

  title: {
    color: "#d4af37",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
};