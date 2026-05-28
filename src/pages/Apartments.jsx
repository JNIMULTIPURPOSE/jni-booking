import { useState, useEffect } from "react";

export default function Apartments() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedHouse, setSelectedHouse] = useState("");

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    budget: "",
    movein: "",
    notes: "",
  });

  const [message, setMessage] = useState("");

  // 🔥 LOAD FROM ADMIN LISTINGS
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("jni_listings")) || [];

    const filtered = saved.filter(
      (item) => item.category === "Apartment"
    );

    setListings(filtered);
  }, []);

  // 🔍 SEARCH FILTER
  const filtered = listings.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  // 📦 BOOKING SYSTEM
  const generateBooking = (houseName, email = "", formData = {}) => {
  const booking = {
    id: "JNI-" + Math.floor(Math.random() * 1000000),
    house: houseName,
    email: email,
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

  const handleBookNow = (houseName) => {
    setSelectedHouse(houseName);
    generateBooking(houseName);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fullname || !form.email || !form.phone || !form.budget) {
      setMessage("Please fill all required fields.");
      return;
    }

    generateBooking(
      selectedHouse || "General Apartment Request",
      form.email
    );

    setForm({
      fullname: "",
      email: "",
      phone: "",
      budget: "",
      movein: "",
      notes: "",
    });
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Apartments</h1>

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
        {filtered.map((item) => (
          <div key={item.id} style={styles.card}>
            <h3>{item.name}</h3>
            <p>{item.location}</p>
            <p>🏠 {item.roomType}</p>
            <p>💰 {item.budget}</p>

            <button
              style={styles.button}
              onClick={() => handleBookNow(item.name)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* GALLERY (still static for now) */}
      <h2 style={styles.sectionTitle}>Gallery</h2>
      <div style={styles.gallery}>
        <div style={styles.photo}>Apartment Photo 1</div>
        <div style={styles.photo}>Apartment Photo 2</div>
        <div style={styles.photo}>Apartment Photo 3</div>
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
          placeholder="Budget Range"
          value={form.budget}
          onChange={(e) =>
            setForm({ ...form, budget: e.target.value })
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
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>
          Submit Booking
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#033d24,#046b3b,#000000,#d4af37)",
    padding: "30px",
    fontFamily: "Arial",
    color: "white",
  },

  title: {
    textAlign: "center",
    color: "#ffd54f",
    fontSize: "40px",
  },

  search: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    marginBottom: "25px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,0.12)",
  },

  button: {
    width: "100%",
    padding: "10px",
    marginTop: "15px",
    background: "#ffd54f",
    color: "#000",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  sectionTitle: {
    marginTop: "40px",
    marginBottom: "15px",
    color: "#ffd54f",
  },

  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "15px",
  },

  photo: {
    height: "140px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    display: "grid",
    gap: "14px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
  },

  textarea: {
    minHeight: "100px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
  },

  message: {
    marginTop: "20px",
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
  },
};