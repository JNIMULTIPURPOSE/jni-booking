import ListingCard from "../components/ListingCard";
import RoomPageLayout from "./RoomPageLayout";

export default function AirbnbStays() {
  const listings = [
    { title: "Modern Airbnb Loft", location: "Kileleshwa, Nairobi", price: Enquire },
    { title: "City View Studio", location: "CBD Nairobi", price: Enquire },
    { title: "Cozy Airbnb Apartment", location: "Karen, Nairobi", price: Enquire },
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