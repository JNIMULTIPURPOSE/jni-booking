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

  /* LOAD LISTINGS */
  const fetchListings = async () => {
    try {
      const res = await axios.get(
        "https://jni-backend.onrender.com/api/listings"
      );

      setListings(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (error) {
      console.log(error);
      setError("Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* CREATE LISTING */
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

      /* FIXED TOKEN KEY */
      const token = localStorage.getItem("jni_token");

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
    const confirmDelete = window.confirm("Delete this listing?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("jni_token");

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>🏠 Manage Listings</h2>

      {/* form unchanged */}
      {/* listings UI unchanged */}
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