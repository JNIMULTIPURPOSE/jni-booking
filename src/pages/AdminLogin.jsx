import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate email
    if (form.email !== "admin@jni.com") {
      setMessage("Invalid admin email");
      return;
    }

    // Validate password
    if (form.password !== "admin123") {
      setMessage("Wrong password");
      return;
    }

    // Save admin session
    localStorage.setItem("jni_admin", "true");

    setMessage("Login successful... redirecting");

    // Redirect to dashboard
    setTimeout(() => {
      navigate("/admin");
    }, 1000);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Admin Login</h1>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

        {message && <p style={styles.msg}>{message}</p>}
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#033d24,#046b3b,#000,#d4af37)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
    color: "white",
  },

  title: {
    color: "#ffd54f",
    marginBottom: "20px",
  },

  form: {
    display: "grid",
    gap: "15px",
    width: "300px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
  },

  button: {
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#ffd54f",
    fontWeight: "bold",
    cursor: "pointer",
  },

  msg: {
    textAlign: "center",
  },
};