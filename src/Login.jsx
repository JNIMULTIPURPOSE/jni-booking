import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      setMessage(res.data.message);

      /* SAVE USER */
      localStorage.setItem(
        "jni_user",
        JSON.stringify(res.data.user)
      );

      localStorage.setItem(
        "jni_token",
        res.data.token
      );

      /* REDIRECT */
      navigate("/home");

    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h1 style={styles.logo}>
            JNI Multipurpose
          </h1>

          <p style={styles.subtitle}>
            Welcome Back
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />

            <button
              type="submit"
              style={styles.button}
            >
              Login
            </button>
          </form>

          {message && (
            <p style={styles.message}>
              {message}
            </p>
          )}

          <p style={styles.signupText}>
            Don’t have an account?{" "}
            <a
              href="/signup"
              style={styles.link}
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#046b3b,#0f5132,#000,#d4af37)",
    fontFamily: "Arial",
  },

  overlay: {
    minHeight: "100vh",
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(255,255,255,0.08)",
    padding: "30px",
    borderRadius: "20px",
    backdropFilter: "blur(12px)",
    border:
      "1px solid rgba(255,255,255,0.15)",
    color: "white",
  },

  logo: {
    textAlign: "center",
    marginBottom: "5px",
  },

  subtitle: {
    textAlign: "center",
    color: "#ffd54f",
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#ffd54f",
    color: "#000",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
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
  },
};