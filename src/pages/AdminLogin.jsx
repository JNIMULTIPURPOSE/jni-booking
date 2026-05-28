import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  setLoading(true);
  setMessage("");

  try {
    const res = await axios.post(
      "https://jni-backend.onrender.com/api/admin/login",
      {
        email: form.email,
        password: form.password,
      }
    );

    // SAVE ADMIN SESSION (from backend response)
    localStorage.setItem(
      "jni_admin",
      JSON.stringify(res.data.admin)
    );

    localStorage.setItem(
      "jni_admin_token",
      res.data.token
    );

    setMessage(
      "Login successful ✅ Redirecting..."
    );

    setTimeout(() => {
      navigate("/admin");
    }, 1200);

  } catch (error) {
    console.log(error);
    setMessage("Invalid credentials");
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          JNI Admin Panel
        </h1>

        <p style={styles.subtitle}>
          Secure administrator access
        </p>

        <form
          onSubmit={handleLogin}
          style={styles.form}
        >
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        {message && (
          <p style={styles.msg}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#033d24,#046b3b,#000,#d4af37)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial",
  },

  card: {
    width: "100%",
    maxWidth: "400px",
    background:
      "rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "35px",
    backdropFilter: "blur(10px)",
    border:
      "1px solid rgba(255,255,255,0.12)",
    color: "white",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.4)",
  },

  title: {
    color: "#ffd54f",
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "32px",
  },

  subtitle: {
    textAlign: "center",
    opacity: 0.8,
    marginBottom: "28px",
    lineHeight: "1.5",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    fontSize: "15px",
    background:
      "rgba(255,255,255,0.95)",
  },

  button: {
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "#ffd54f",
    color: "#000",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
  },

  msg: {
    marginTop: "18px",
    textAlign: "center",
    fontWeight: "bold",
  },
};