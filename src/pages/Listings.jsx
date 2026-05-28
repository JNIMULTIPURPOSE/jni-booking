import { useEffect, useState } from "react";
import axios from "axios";

export default function Listings() {
  const [listings, setListings] = useState([]);

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

  /* LOAD LISTINGS */
  const fetchListings = async () => {
    try {
      const res = await axios.get(
        "https://jni-backend.onrender.com/api/listings"
      );

      setListings(true);
      SetError("");

    } catch (error) {
      console.log(error);
      setError(
        "Failed to load"
      );
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  /* HANDLE INPUT */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* CREATE LISTING */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.category ||
      !form.location ||
      !form.price
    ) {
      alert("Please fill required fields");
      return;
    }

    try {
      let imageUrl = "";

      /* IMAGE UPLOAD */
      if (form.image) {
        const imageData = new FormData();

        imageData.append(
          "image",
          form.image
        );

        const uploadRes = await axios.post(
          "https://jni-backend.onrender.com/api/upload",
          imageData
        );

        imageUrl = uploadRes.data.imageUrl;
      }

      /* FINAL ROOM TYPE */
      const finalRoomType =
        form.roomType === "Custom"
          ? form.customRoomType
          : form.roomType;

      /* FINAL FORM */
      const finalForm = {
        title: form.title,
        category: form.category,
        location: form.location,
        roomType: finalRoomType,
        price: form.price,
        description: form.description,
        image: imageUrl,
      };

      /* TOKEN */
      const token =
        localStorage.getItem("token");

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

    } catch (error) {
      console.log(error);

      alert("Failed to add listing");
    }
  };

  /* DELETE LISTING */
  const deleteListing = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this listing?"
    );

    if (!confirmDelete) return;

    try {
      const token =
        localStorage.getItem("token");

      await axios.delete(
        `https://jni-backend.onrender.com/api/listings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchListings();

    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
  return (
    <div style={styles.loading}>
      Loading...
    </div>
  );
}

if (error) {
  return (
    <div style={styles.error}>
      {error}
    </div>
  );
}

  return (
    <div>
      <h2 style={styles.heading}>
        🏠 Manage Listings
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={styles.form}
      >
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">
            Select Category
          </option>

          <option>Hotels</option>
          <option>Motels</option>
          <option>Hostels</option>
          <option>Apartments</option>
          <option>Airbnb Stays</option>
          <option>Vacation Homes</option>
          <option>Resorts</option>
          <option>Guest Houses</option>
          <option>Meeting Rooms</option>
          <option>Office Spaces</option>
          <option>Event Venues</option>
          <option>Conference Rooms</option>
          <option>Studio Rentals</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          style={styles.input}
        />

        {/* ROOM TYPE SELECT */}
        <select
          name="roomType"
          value={form.roomType}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">
            Select Room Type
          </option>

          <option>Single Room</option>
          <option>Double Room</option>
          <option>Twin Room</option>
          <option>Deluxe Room</option>
          <option>Executive Suite</option>
          <option>Presidential Suite</option>
          <option>Family Room</option>
          <option>Studio</option>
          <option>Bedsitter</option>
          <option>1 Bedroom</option>
          <option>2 Bedroom</option>
          <option>3 Bedroom</option>
          <option>Penthouse</option>
          <option>Office Space</option>
          <option>Conference Room</option>
          <option>Event Hall</option>
          <option>Custom</option>
        </select>

        {/* CUSTOM ROOM TYPE */}
        {form.roomType === "Custom" && (
          <input
            type="text"
            name="customRoomType"
            placeholder="Enter custom room type"
            value={form.customRoomType}
            onChange={handleChange}
            style={styles.input}
          />
        )}

        <input
          type="text"
          name="price"
          placeholder="Price range"
          value={form.price}
          onChange={handleChange}
          style={styles.input}
        />

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.files[0],
            })
          }
          style={styles.input}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={styles.textarea}
        />

        <button
          type="submit"
          style={styles.button}
        >
          Add Listing
        </button>
      </form>

      {/* LISTINGS */}
      <div style={styles.grid}>
        {listings.map((item) => (
          <div
            key={item._id}
            style={styles.card}
          >
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

            <div style={styles.content}>
              <h3>{item.title}</h3>

              <p>
                📍 {item.location}
              </p>

              <p>
                🏷️ {item.category}
              </p>

              <p>
                🛏️ {item.roomType}
              </p>

              <p style={styles.price}>
                💰 {item.price}
              </p>

              {item.description && (
                <p style={styles.description}>
                  {item.description}
                </p>
              )}

              <button
                style={styles.deleteBtn}
                onClick={() =>
                  deleteListing(item._id)
                }
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  heading: {
    color: "#ffd54f",
    marginBottom: "20px",
  },

  form: {
    background:
      "rgba(255,255,255,0.08)",
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

  textarea: {
    minHeight: "100px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    resize: "vertical",
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
    gridTemplateColumns:
      "repeat(auto-fit,minmax(260px,1fr))",
    gap: "20px",
  },

  card: {
    background:
      "rgba(255,255,255,0.08)",
    borderRadius: "14px",
    overflow: "hidden",
    color: "white",
    border:
      "1px solid rgba(255,255,255,0.1)",
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
    background:
      "rgba(255,255,255,0.05)",
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

  loading: {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "20px",
},

error: {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "red",
  fontSize: "18px",
},

};