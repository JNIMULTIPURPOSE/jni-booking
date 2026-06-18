import { useState, useEffect } from "react";
import axios from "axios";

export default function Apartments() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedHouse, setSelectedHouse] = useState("");

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    budget: "",
    location: "",
    movein: "",
    notes: "",
  });

  const [message, setMessage] = useState("");

  /* ================= LOAD APARTMENTS ================= */
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const res = await axios.get(
          "https://jni-backend.onrender.com/api/listings"
        );

        const filtered = res.data.filter(
          (item) => item.category === "Apartments"
        );

        setListings(filtered);
      } catch (error) {
        console.log("APARTMENTS ERROR:", error);
      }
    };

    fetchApartments();
  }, []);

  /* ================= SEARCH ================= */
  const filtered = listings.filter((item) =>
    (item.title || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (item.location || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ================= BOOKING ================= */
  const generateBooking = (houseName, email = "", formData = {}) => {
    const booking = {
      id: "JNI-" + Math.floor(Math.random() * 1000000),
      house: houseName,
      email,
      name: formData.fullname || "",
      phone: formData.phone || "",
      budget: formData.budget || "",
      date: new Date().toLocaleString(),
      status: "Pending",
    };

    const old =
      JSON.parse(localStorage.getItem("jni_bookings")) || [];

    old.push(booking);

    localStorage.setItem("jni_bookings", JSON.stringify(old));
  };

  /* ================= BOOK NOW ================= */
  const handleBookNow = (houseName) => {
    setSelectedHouse(houseName);
    generateBooking(houseName);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !form.fullname ||
    !form.email ||
    !form.phone ||
    !form.budget ||
    !form.movein
  ) {
    setMessage("Please fill all required fields.");
    return;
  }

  try {
    await axios.post(
  "https://jni-backend.onrender.com/api/bookings",
  {
    house: selectedHouse || "General Apartment Request",

    category: "Apartments",

    location: form.location,

    roomType: "Apartment",

    price: form.budget,

    image: "",

    name: form.fullname,

    phone: form.phone,

    email: form.email,

    checkin: form.movein,

    notes: form.notes,

    referralCode:
      localStorage.getItem("referralCode") || "",

    status: "Pending",
  }
);

    setMessage(
      "Booking submitted successfully ✅"
    );

    setForm({
      fullname: "",
      email: "",
      phone: "",
      budget: "",
      location: "",
      movein: "",
      notes: "",
    });

  } catch (error) {
    console.log(error);

    setMessage(
      "Booking failed. Please try again."
    );
  }
};

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🏢 Apartments</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search apartments..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* LISTINGS */}
      <div style={styles.grid}>
        {filtered.length === 0 ? (
          <p style={styles.empty}>
            No apartments available yet.
          </p>
        ) : (
          filtered.map((item) => (
            <div key={item._id} style={styles.card}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  style={styles.image}
                />
              ) : (
                <div style={styles.noImage}>
                  No Image
                </div>
              )}

              <h3>{item.title}</h3>
              <p>📍 {item.location}</p>
              <p>🏠 {item.roomType}</p>
              <p style={styles.price}>💰 {item.price}</p>

              <button
                style={styles.button}
                onClick={() => handleBookNow(item.title)}
              >
                Book Now
              </button>
            </div>
          ))
        )}
      </div>

      {/* GALLERY */}
      <h2 style={styles.sectionTitle}>Gallery</h2>

      <div style={styles.gallery}>
        {filtered.length === 0 ? (
          <p>No apartment gallery yet.</p>
        ) : (
          filtered.map((item) => (
            <div key={item._id + "-g"} style={styles.photo}>
              {item.image ? (
                <img src={item.image} alt="" style={styles.image} />
              ) : (
                "No Image"
              )}
            </div>
          ))
        )}
      </div>

      {/* BOOKING FORM */}
      <h2 style={styles.sectionTitle}>Booking Form</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Full Name"
          value={form.fullname}
          onChange={(e) =>
            setForm({ ...form, fullname: e.target.value })
          }
          style={styles.input}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={styles.input}
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          style={styles.input}
        />

        <input
          placeholder="Budget"
          value={form.budget}
          onChange={(e) =>
            setForm({ ...form, budget: e.target.value })
          }
          style={styles.input}
        />

        <input
          placeholder="Preferred Location"
          value={form.location}
          onChange={(e) =>
            setForm({
      ...form,
      location: e.target.value,
    })
  }
  style={styles.input}
/>

        <input
          type="date"
          value={form.movein}
          onChange={(e) =>
            setForm({ ...form, movein: e.target.value })
          }
          style={styles.input}
        />

        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) =>
            setForm({ ...form, notes: e.target.value })
          }
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Submit Booking
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

/* SAME STYLE STRUCTURE */
const styles = {
  page: {
    padding: "30px",
    background: "#000",
    color: "white",
    minHeight: "100vh",
    fontFamily: "Arial",
  },
  title: { color: "#d4af37" },
  search: { width: "100%", padding: "10px", marginBottom: "20px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
  },
  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "15px",
    borderRadius: "12px",
  },
  image: { width: "100%", height: "150px", objectFit: "cover" },
  noImage: { height: "120px", display: "flex", justifyContent: "center" },
  button: {
    width: "100%",
    marginTop: "10px",
    padding: "10px",
    background: "#ffd54f",
    border: "none",
    fontWeight: "bold",
  },
  sectionTitle: { marginTop: "30px", color: "#ffd54f" },
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
    gap: "10px",
  },
  photo: { height: "120px", background: "#222" },
  form: { display: "grid", gap: "10px" },
  input: { padding: "10px" },
  empty: { opacity: 0.7 },
  price: { color: "#ffd54f", fontWeight: "bold" },
  message: { marginTop: "10px", color: "lightgreen" },
};