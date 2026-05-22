import { useEffect, useState } from "react";
import axios from "axios";

export default function RoomPageLayout({
  category,
  title,
  subtitle,
}) {
  const [listings, setListings] = useState([]);
  const [search, setSearch] =
  useState("");

  /* BOOKING MODAL */
  const [selectedListing, setSelectedListing] =
    useState(null);

  const [generalBooking, setGeneralBooking] =
    useState(false);

  const [bookingForm, setBookingForm] =
    useState({
      name: "",
      phone: "",
      email: "",
      checkin: "",
      notes: "",
    });

  const filteredListings =
  listings.filter((item) => {
    const text = `
      ${item.title}
      ${item.location}
      ${item.roomType}
    `.toLowerCase();

    return text.includes(
      search.toLowerCase()
    );
  });

  /* LOAD LISTINGS */
  useEffect(() => {
    const loadListings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/listings"
        );

        const filtered = res.data.filter(
          (item) => item.category === category
        );

        setListings(filtered);

      } catch (error) {
        console.log(error);
      }
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
  }, [category]);

  /* OPEN BOOKING */
  const openBooking = (listing) => {
    setSelectedListing(listing);
  };

  /* CLOSE BOOKING */
  const closeBooking = () => {
    setSelectedListing(null);

    setGeneralBooking(false);

    setBookingForm({
      name: "",
      phone: "",
      email: "",
      checkin: "",
      notes: "",
    });
  };

  /* SAVE BOOKING */
  const submitBooking = async () => {
    if (
      !bookingForm.name ||
      !bookingForm.phone ||
      !bookingForm.checkin
    ) {
      alert("Please fill required fields.");
      return;
    }

    try {
      const newBooking = {
        house: selectedListing
          ? selectedListing.title
          : `Custom ${category} Request`,

        location:
          selectedListing?.location || "",

        roomType:
          selectedListing?.roomType || "",

        price:
          selectedListing?.price || "",

        image:
          selectedListing?.image || "",

        category:
          selectedListing?.category ||
          category,

        name: bookingForm.name,

        phone: bookingForm.phone,

        email: bookingForm.email,

        checkin: bookingForm.checkin,

        notes: bookingForm.notes,
      };

      await axios.post(
        "http://localhost:5000/api/bookings",
        newBooking
      );

      alert(
        "Booking submitted successfully ✅"
      );

      closeBooking();

    } catch (error) {
      console.log(error);

      alert("Booking failed");
    }
  };

  return (
    <div style={styles.page}>
      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.title}>{title}</h1>

        <p style={styles.subtitle}>
          {subtitle}
        </p>
      </div>

      {/* LISTINGS */}
      <input
  type="text"
  placeholder="Search by title, location, room..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  style={styles.searchInput}
/>

      <h2 style={styles.sectionTitle}>
        🆕 Latest Listings
      </h2>

      {filteredListings.length === 0 ? (
        <div style={styles.empty}>
          <h3>No listings available yet.</h3>

          <p>
            Admin-added listings will appear
            here automatically.
          </p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredListings.map((item) => (
            <div
              key={item._id}
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

              <div style={styles.cardContent}>
                <h3>{item.title}</h3>

                <p>📍 {item.location}</p>

                <p>🛏️ {item.roomType}</p>

                <p>💰 {item.price}</p>

                {item.description && (
                  <p style={styles.description}>
                    {item.description}
                  </p>
                )}

                <button
                  style={styles.button}
                  onClick={() =>
                    openBooking(item)
                  }
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FLOATING BUTTON */}
      <button
        style={styles.floatingButton}
        onClick={() =>
          setGeneralBooking(true)
        }
      >
        📅 Request Booking
      </button>

      {/* BOOKING MODAL */}
      {(selectedListing ||
        generalBooking) && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>
              Booking Request
            </h2>

            <p style={styles.modalProperty}>
              {selectedListing
                ? selectedListing.title
                : `Custom ${category} Request`}
            </p>

            {/* PROPERTY PREVIEW */}
            {selectedListing?.image && (
              <img
                src={selectedListing.image}
                alt={selectedListing.title}
                style={styles.modalImage}
              />
            )}

            {selectedListing && (
              <div style={styles.propertyInfo}>
                <p>
                  📍{" "}
                  {selectedListing.location}
                </p>

                <p>
                  🛏️{" "}
                  {selectedListing.roomType}
                </p>

                <p style={styles.modalPrice}>
                  💰{" "}
                  {selectedListing.price}
                </p>
              </div>
            )}

            <input
              type="text"
              placeholder="Your Name *"
              value={bookingForm.name}
              onChange={(e) =>
                setBookingForm({
                  ...bookingForm,
                  name: e.target.value,
                })
              }
              style={styles.input}
            />

            <input
              type="tel"
              placeholder="Phone Number *"
              value={bookingForm.phone}
              onChange={(e) =>
                setBookingForm({
                  ...bookingForm,
                  phone: e.target.value,
                })
              }
              style={styles.input}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={bookingForm.email}
              onChange={(e) =>
                setBookingForm({
                  ...bookingForm,
                  email: e.target.value,
                })
              }
              style={styles.input}
            />

            <input
              type="date"
              value={bookingForm.checkin}
              onChange={(e) =>
                setBookingForm({
                  ...bookingForm,
                  checkin: e.target.value,
                })
              }
              style={styles.input}
            />

            <textarea
              placeholder="Additional Notes"
              value={bookingForm.notes}
              onChange={(e) =>
                setBookingForm({
                  ...bookingForm,
                  notes: e.target.value,
                })
              }
              style={styles.textarea}
            />

            <div style={styles.modalActions}>
              <button
                style={styles.cancelBtn}
                onClick={closeBooking}
              >
                Cancel
              </button>

              <button
                style={styles.confirmBtn}
                onClick={submitBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
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

searchInput: {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  marginBottom: "25px",
  outline: "none",
  fontSize: "15px",
},

  hero: {
    textAlign: "center",
    marginBottom: "40px",
  },

  title: {
    fontSize: "42px",
    color: "#ffd54f",
    marginBottom: "12px",
  },

  subtitle: {
    opacity: 0.85,
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: "1.6",
  },

  floatingButton: {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    padding: "14px 20px",
    background: "#ffd54f",
    color: "#000",
    border: "none",
    borderRadius: "40px",
    fontWeight: "bold",
    cursor: "pointer",
    zIndex: 999,
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.3)",
  },

  sectionTitle: {
    color: "#ffd54f",
    marginBottom: "20px",
  },

  empty: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "30px",
    borderRadius: "16px",
    textAlign: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "18px",
  },

  card: {
    background:
      "rgba(255,255,255,0.08)",
    borderRadius: "12px",
    overflow: "hidden",
    border:
      "1px solid rgba(255,255,255,0.1)",
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
    background:
      "rgba(255,255,255,0.06)",
  },

  cardContent: {
    padding: "12px",
  },

  description: {
    fontSize: "13px",
    opacity: 0.8,
    marginTop: "8px",
    lineHeight: "1.5",
  },

  button: {
    width: "100%",
    padding: "10px",
    marginTop: "12px",
    background: "#ffd54f",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "rgba(0,0,0,0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    padding: "20px",
  },

  modal: {
    width: "100%",
    maxWidth: "500px",
    background: "#0b1f16",
    borderRadius: "18px",
    padding: "25px",
    border:
      "1px solid rgba(255,255,255,0.1)",
    maxHeight: "90vh",
    overflowY: "auto",
  },

  modalTitle: {
    color: "#ffd54f",
    marginBottom: "10px",
  },

  modalProperty: {
    marginBottom: "15px",
    opacity: 0.85,
    fontSize: "15px",
  },

  modalImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px",
  },

  propertyInfo: {
    marginBottom: "18px",
    lineHeight: "1.8",
    opacity: 0.9,
  },

  modalPrice: {
    color: "#ffd54f",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    resize: "vertical",
    marginBottom: "15px",
    outline: "none",
  },

  modalActions: {
    display: "flex",
    gap: "10px",
  },

  cancelBtn: {
    flex: 1,
    padding: "12px",
    background: "#444",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  confirmBtn: {
    flex: 1,
    padding: "12px",
    background: "#ffd54f",
    color: "#000",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};