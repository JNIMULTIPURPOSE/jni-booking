import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import RoomPageLayout from "./RoomPageLayout";

export default function AirbnbStays() {
  const [listings, setListings] = useState([]);

  /* LOAD ADMIN LISTINGS */
  useEffect(() => {
    const loadListings = () => {
      const saved =
        JSON.parse(
          localStorage.getItem("jni_listings")
        ) || [];

      /* ONLY AIRBNB STAYS */
      const filtered = saved.filter(
        (item) =>
          item.category === "Airbnb Stays"
      );

      setListings(filtered);
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

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        Airbnb Stays
      </h1>

      <div style={styles.grid}>
        {listings.length === 0 ? (
          <p>No Airbnb stays available.</p>
        ) : (
          listings.map((item) => (
            <ListingCard
              key={item._id || item.id}
              title={item.title}
              location={item.location}
              price={item.price}
              image={item.image}
              roomType={item.roomType}
              description={item.description}
            />
          ))
        )}
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
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
};