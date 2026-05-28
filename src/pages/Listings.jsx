import { useEffect, useState } from "react";
import axios from "axios";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    roomType: "",
    customRoomType: "",
    price: "",
    description: "",
    image: null,
  });

  /* ================= FETCH LISTINGS ================= */
  const fetchListings = async () => {
    try {
      const res = await axios.get(
        "https://jni-backend.onrender.com/api/listings"
      );

      setListings(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= CREATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.location || !form.price) {
      alert("Please fill required fields");
      return;
    }

    try {
      let imageUrl = "";

      if (form.image) {
        const imageData = new FormData();
        imageData.append("image", form.image);

        const uploadRes = await axios.post(
          "https://jni-backend.onrender.com/api/upload",
          imageData
        );

        imageUrl = uploadRes.data.imageUrl;
      }

      const finalRoomType =
        form.roomType === "Custom"
          ? form.customRoomType
          : form.roomType;

      const finalForm = {
        title: form.title,
        category: form.category,
        location: form.location,
        roomType: finalRoomType,
        price: form.price,
        description: form.description,
        image: imageUrl,
      };

      const token =
        localStorage.getItem("jni_admin_token") ||
        localStorage.getItem("jni_token");

      await axios.post(
        "https://jni-backend.onrender.com/api/listings",
        finalForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Listing added ✅");

      setForm({
        title: "",
        category: "",
        location: "",
        roomType: "",
        customRoomType: "",
        price: "",
        description: "",
        image: null,
      });

      fetchListings();
    } catch (err) {
      console.log(err);
      alert("Failed to add listing");
    }
  };

  /* ================= DELETE ================= */
  const deleteListing = async (id) => {
    const confirmDelete = window.confirm("Delete this listing?");
    if (!confirmDelete) return;

    try {
      const token =
        localStorage.getItem("jni_admin_token") ||
        localStorage.getItem("jni_token");

      await axios.delete(
        `https://jni-backend.onrender.com/api/listings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchListings();
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= UI STATES ================= */
  if (loading) return <div>Loading listings...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2 style={styles.heading}>🏠 Manage Listings</h2>

      {/* FORM (UNCHANGED STYLE STRUCTURE) */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="title" placeholder="Title" onChange={handleChange} style={styles.input} />
        <input name="category" placeholder="Category" onChange={handleChange} style={styles.input} />
        <input name="location" placeholder="Location" onChange={handleChange} style={styles.input} />
        <input name="roomType" placeholder="Room Type" onChange={handleChange} style={styles.input} />
        <input name="price" placeholder="Price" onChange={handleChange} style={styles.input} />

        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
        />

        <button type="submit" style={styles.button}>
          Add Listing
        </button>
      </form>

      {/* 🔥 FIX: GRID RESTORED PROPERLY */}
      <div style={styles.grid}>
        {listings.length === 0 ? (
          <p>No listings found</p>
        ) : (
          listings.map((item) => (
            <div key={item._id} style={styles.card}>
              {item.image ? (
                <img src={item.image} alt={item.title} style={styles.image} />
              ) : (
                <div style={styles.noImage}>No Image</div>
              )}

              <div style={styles.content}>
                <h3>{item.title}</h3>
                <p>📍 {item.location}</p>
                <p>🏷️ {item.category}</p>
                <p>🛏️ {item.roomType}</p>
                <p style={styles.price}>💰 {item.price}</p>

                {item.description && (
                  <p style={styles.description}>{item.description}</p>
                )}

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteListing(item._id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ================= ORIGINAL STYLES (UNCHANGED) ================= */
const styles = {
  heading: {
    color: "#ffd54f",
    marginBottom: "20px",
  },

  form: {
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "30px",
    display: "grid",
    gap: "12px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
  },

  button: {
    padding: "12px",
    background: "#ffd54f",
    color: "#000",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "20px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "14px",
    overflow: "hidden",
    color: "white",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  },

  noImage: {
    height: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255,255,255,0.05)",
  },

  content: {
    padding: "15px",
  },

  price: {
    color: "#ffd54f",
    fontWeight: "bold",
    marginTop: "8px",
  },

  description: {
    marginTop: "10px",
    opacity: 0.8,
    lineHeight: "1.5",
    fontSize: "14px",
  },

  deleteBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "15px",
    background: "crimson",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};