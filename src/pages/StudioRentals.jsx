import ListingCard from "../components/ListingCard";

export default function StudioRentals() {
  const listings = [
    { title: "Photo Studio", location: "Industrial Area, Nairobi", price: 15000 },
    { title: "Music Recording Studio", location: "Westlands", price: 30000 },
    { title: "Creative Studio Space", location: "CBD Nairobi", price: 20000 },
  ];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Studio Rentals</h1>

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