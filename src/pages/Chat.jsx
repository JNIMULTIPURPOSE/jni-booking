import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const bottomRef = useRef(null);

  const userEmail =
    localStorage.getItem("jni_user_email") ||
    "guest";

  /* LOAD CHATS */
const loadChats = async () => {
  try {
    const res = await axios.get(
      "https://jni-backend.onrender.com/api/chat"
    );

    setMessages(res.data);

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    loadChats();

    const handleStorage = () => {
      loadChats();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  useEffect(() => {
  const interval = setInterval(() => {
    const saved =
      JSON.parse(localStorage.getItem("jni_chat")) || [];

    setChat(
      saved.filter((c) => c.user === userEmail)
    );
  }, 1000);

  return () => clearInterval(interval);
}, []);

  /* AUTO SCROLL */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat]);

  /* SEND MESSAGE */
  const sendMessage = async () => {
  if (!input.trim()) return;

  try {
    await axios.post(
      "https://jni-backend.onrender.com/api/chat",
      {
        sender: "user",

        message: input,

        userEmail:
          JSON.parse(
            localStorage.getItem(
              "jni_user"
            )
          )?.email || "",
      }
    );

    setInput("");

    loadChats();

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>
            💬 Chat Support
          </h2>

          <p style={styles.subtitle}>
            Chat directly with JNI admin
          </p>
        </div>

        <div style={styles.status}>
          🟢 Online
        </div>
      </div>

      {/* CHAT AREA */}
      <div style={styles.chatBox}>
        {chat.length === 0 ? (
          <div style={styles.empty}>
            No messages yet.
            <br />
            Start chatting with admin.
          </div>
        ) : (
          chat.map((c) => (
            <div
              key={c.id}
              style={{
                display: "flex",
                justifyContent:
                  c.sender === "user"
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.message,
                  background:
                    c.sender === "user"
                      ? "#ffd54f"
                      : "rgba(255,255,255,0.12)",
                  color:
                    c.sender === "user"
                      ? "#000"
                      : "#fff",
                  borderBottomRightRadius:
                    c.sender === "user"
                      ? "4px"
                      : "16px",
                  borderBottomLeftRadius:
                    c.sender === "admin"
                      ? "4px"
                      : "16px",
                }}
              >
                <div>{c.text}</div>

                <small style={styles.time}>
                  {c.time}
                </small>
              </div>
            </div>
          ))
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div style={styles.inputArea}>
        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Type your message..."
          style={styles.input}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            sendMessage()
          }
        />

        <button
          onClick={sendMessage}
          style={styles.sendButton}
        >
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "18px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    flexDirection: "column",
    height: "78vh",
  },

  /* HEADER */
  header: {
    padding: "18px 20px",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(0,0,0,0.15)",
  },

  title: {
    color: "#ffd54f",
    marginBottom: "4px",
  },

  subtitle: {
    fontSize: "13px",
    opacity: 0.75,
  },

  status: {
    fontSize: "13px",
    background: "rgba(255,255,255,0.08)",
    padding: "8px 12px",
    borderRadius: "30px",
  },

  /* CHAT AREA */
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  empty: {
    margin: "auto",
    textAlign: "center",
    opacity: 0.7,
    lineHeight: "1.7",
  },

  message: {
    maxWidth: "75%",
    padding: "12px 14px",
    borderRadius: "16px",
    lineHeight: "1.5",
    wordBreak: "break-word",
  },

  time: {
    display: "block",
    marginTop: "6px",
    fontSize: "10px",
    opacity: 0.7,
    textAlign: "right",
  },

  /* INPUT */
  inputArea: {
    display: "flex",
    gap: "10px",
    padding: "15px",
    borderTop:
      "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.1)",
  },

  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.95)",
  },

  sendButton: {
    padding: "0 22px",
    borderRadius: "12px",
    border: "none",
    background: "#ffd54f",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  },
};