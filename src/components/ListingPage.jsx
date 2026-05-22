import { useEffect, useState } from "react";

export default function Listings() {
  const [listings, setListings] = useState([]);

  const [form, setForm] = useState({
    name: "",
    location: "",
    minBudget: "",
    maxBudget: "",
    category: "Apartment",
    roomType: "1 Bedroom",
    dateAvailable: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("jni_listings")) || [];
    setListings(saved);
  }, []);

  const saveToStorage = (data) => {
    setListings(data);
    localStorage.setItem("jni_listings", JSON.stringify(data));
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!form.name || !form.location) return;

    const newListing = {
      id: Date.now(),
      name: form.name,
      location: form.location,
      category: form.category,
      roomType: form.roomType,
      budget: `${form.minBudget} - ${form.maxBudget}`,
      dateAvailable: form.dateAvailable || "Not specified",
      image: form.image || null,
      description: form.description || "",
    };

    const updated = [...listings, newListing];
    saveToStorage(updated);

    setForm({
      name: "",
      location: "",
      minBudget: "",
      maxBudget: "",
      category: "Apartment",
      roomType: "1 Bedroom",
      dateAvailable: "",
      image: "",
      description: "",
    });
  };

  const handleDelete = (id) => {
    const updated = listings.filter((l) => l.id !== id);
    saveToStorage(updated);
  };

  return (
    <div>
      <h2>🏠 Listings Management</h2>

      {/* FORM */}
      <form onSubmit={handleAdd} style={styles.form}>
        <input
          placeholder="House Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <input
          placeholder="Min Budget (KES)"
          value={form.minBudget}
          onChange={(e) =>
            setForm({ ...form, minBudget: e.target.value })
          }
        />

        <input
          placeholder="Max Budget (KES)"
          value={form.maxBudget}
          onChange={(e) =>
            setForm({ ...form, maxBudget: e.target.value })
          }
        />

        <input
          type="date"
          value={form.dateAvailable}
          onChange={(e) =>
            setForm({ ...form, dateAvailable: e.target.value })
          }
        />

        <input
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <textarea
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <select
          value={form.roomType}
          onChange={(e) =>
            setForm({ ...form, roomType: e.target.value })
          }
        >
          <option value="1 Bedroom">1 Bedroom</option>
          <option value="2 Bedroom">2 Bedroom</option>
          <option value="3 Bedroom">3 Bedroom</option>
          <option value="Bedsitter">Bedsitter</option>
          <option value="Single Room">Single Room</option>
          <option value="Hall">Hall</option>
        </select>

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option>Apartment</option>
          <option>Airbnb</option>
          <option>Studio</option>
          <option>Hotel</option>
          <option>Villa</option>
        </select>

        <button type="submit">➕ Add Listing</button>
      </form>

      {/* LISTINGS */}
      <div style={styles.grid}>
        {listings.map((l) => (
          <div key={l.id} style={styles.card}>
            {l.image && (
              <img
                src={l.image}
                alt={l.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            )}

            <h3>{l.name}</h3>
            <p>📍 {l.location}</p>
            <p>🏷 {l.category}</p>
            <p>🏠 {l.roomType}</p>
            <p>💰 {l.budget}</p>
            <p>📅 {l.dateAvailable}</p>

            {l.description && <p>{l.description}</p>}

            <button onClick={() => handleDelete(l.id)}>
              ❌ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  form: {
    display: "grid",
    gap: "10px",
    maxWidth: "400px",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },

  card: {
    padding: "15px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "10px",
  },
};