import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
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
        "https://jni-backend.onrender.com/api/auth/login",
        form
      );

      console.log(res.data);

      /* SAVE USER */
      localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

localStorage.setItem(
  "token",
  res.data.token
);

      setMessage("Login successful ✅");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      console.log(err);

      setMessage(
        err.response?.data?.message ||
          "Login failed"
      );
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          JNI Multipurpose
        </h1>

        <p style={styles.subtitle}>
          Welcome back
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
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
          <p style={styles.message}>
            {message}
          </p>
        )}

        <p style={styles.signupText}>
          Don’t have an account?{" "}
          <Link
            to="/signup"
            style={styles.link}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    background:
      "linear-gradient(135deg,#033d24,#046b3b,#000,#d4af37)",
    fontFamily: "Arial",
  },

  card: {
    width: "100%",
    maxWidth: "400px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "18px",
    padding: "35px",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "white",
    boxShadow:
      "0 8px 30px rgba(0,0,0,0.35)",
  },

  title: {
    textAlign: "center",
    color: "#ffd54f",
    marginBottom: "8px",
  },

  subtitle: {
    textAlign: "center",
    opacity: 0.8,
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "14px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#ffd54f",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
  },

  message: {
    marginTop: "15px",
    textAlign: "center",
  },

  signupText: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
  },

  link: {
    color: "#ffd54f",
    fontWeight: "bold",
    textDecoration: "none",
  },
};