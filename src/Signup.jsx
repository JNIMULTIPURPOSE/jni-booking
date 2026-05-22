import { useState } from "react";
import axios from "axios";
export default function Signup() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
  e.preventDefault();

  if (
    !form.fullname ||
    !form.email ||
    !form.phone ||
    !form.password ||
    !form.confirmPassword
  ) {
    setMessage("Please fill all fields.");
    return;
  }

  if (form.password !== form.confirmPassword) {
    setMessage("Passwords do not match.");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/signup",
      {
        fullname: form.fullname,
        email: form.email,
        phone: form.phone,
        password: form.password,
      }
    );

    setMessage(res.data.message);

    setForm({
      fullname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

  } catch (err) {
    setMessage(
      err.response?.data?.message ||
      "Signup failed."
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
            Create Your Account
          </p>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={form.fullname}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
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

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />

            <button
              type="submit"
              style={styles.button}
            >
              {loading
                ? "Creating Account..."
                : "Sign Up"}
            </button>
          </form>

          {message && (
            <p style={styles.message}>
              {message}
            </p>
          )}

          <p style={styles.loginText}>
            Already have an account?{" "}
            <a
              href="/login"
              style={styles.link}
            >
              Login
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
      "linear-gradient(135deg, #046b3b, #0f5132, #000000, #d4af37)",
    fontFamily: "Arial, sans-serif",
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
    color: "#ffffff",
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
    marginTop: "5px",
  },

  message: {
    marginTop: "15px",
    textAlign: "center",
    color: "#ffffff",
  },

  loginText: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
  },

  link: {
    color: "#ffd54f",
    cursor: "pointer",
    fontWeight: "bold",
  },
};