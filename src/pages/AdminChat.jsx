import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

export default function AdminChat() {
  const [allChats, setAllChats] = useState([]);
  const [selectedUser, setSelectedUser] =
    useState("");

  const [reply, setReply] = useState("");

  const bottomRef = useRef(null);

  /* ================= LOAD CHATS ================= */
  const loadChats = async () => {
    try {
      const res = await axios.get(
        "https://jni-backend.onrender.com/api/chat"
      );

      setAllChats(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadChats();

    const interval = setInterval(() => {
      loadChats();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [allChats, selectedUser]);

  /* ================= USERS ================= */
  const users = useMemo(() => {
    return [
      ...new Set(
        allChats
          .map((c) => c.userEmail)
          .filter(Boolean)
      ),
    ];
  }, [allChats]);

  /* ================= USER MESSAGES ================= */
  const messages = useMemo(() => {
    if (!selectedUser) return [];

    return allChats.filter(
      (c) => c.userEmail === selectedUser
    );
  }, [allChats, selectedUser]);

  /* ================= OPEN CHAT ================= */
  const openChat = async (email) => {
    setSelectedUser(email);

    try {
      await axios.put(
        "https://jni-backend.onrender.com/api/chat/read"
      );

      loadChats();

    } catch (error) {
      console.log(error);
    }
  };

  /* ================= SEND REPLY ================= */
  const sendReply = async () => {
    if (!reply.trim()) return;

    try {
      await axios.post(
        "https://jni-backend.onrender.com/api/chat",
        {
          sender: "admin",
          message: reply,
          userEmail: selectedUser,
        }
      );

      setReply("");

      loadChats();

    } catch (error) {
      console.log(error);
    }
  };

  /* ================= DELETE MESSAGE ================= */
  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this message?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://jni-backend.onrender.com/api/chat/${id}`
      );

      loadChats();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h3 style={styles.title}>
          💬 Conversations
        </h3>

        {users.length === 0 ? (
          <div style={styles.noUsers}>
            No chats yet
          </div>
        ) : (
          users.map((u) => {
            const unread = allChats.filter(
              (m) =>
                m.userEmail === u &&
                m.sender !== "admin" &&
                !m.read
            ).length;

            return (
              <div
                key={u}
                onClick={() => openChat(u)}
                style={{
                  ...styles.user,
                  background:
                    selectedUser === u
                      ? "#ffd54f"
                      : "rgba(255,255,255,0.08)",

                  color:
                    selectedUser === u
                      ? "#000"
                      : "#fff",
                }}
              >
                <div>🟢 {u}</div>

                {unread > 0 && (
                  <span style={styles.badge}>
                    {unread}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* CHAT AREA */}
      <div style={styles.chatArea}>
        {selectedUser ? (
          <>
            <div style={styles.header}>
              Chat with {selectedUser}
            </div>

            <div style={styles.messages}>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "admin"
                        ? "flex-end"
                        : "flex-start",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      ...styles.bubble,
                      background:
                        msg.sender === "admin"
                          ? "#ffd54f"
                          : "rgba(255,255,255,0.12)",

                      color:
                        msg.sender === "admin"
                          ? "#000"
                          : "#fff",
                    }}
                  >
                    <div>{msg.message}</div>

                    <small style={styles.time}>
                      {new Date(
                        msg.createdAt
                      ).toLocaleTimeString()}
                    </small>
                  </div>

                  <button
                    onClick={() =>
                      deleteMessage(msg._id)
                    }
                    style={styles.iconBtn}
                  >
                    🗑️
                  </button>
                </div>
              ))}

              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div style={styles.inputRow}>
              <input
                value={reply}
                onChange={(e) =>
                  setReply(e.target.value)
                }
                placeholder="Type reply..."
                style={styles.input}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  sendReply()
                }
              />

              <button
                onClick={sendReply}
                style={styles.send}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div style={styles.empty}>
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "75vh",
    borderRadius: "16px",
    overflow: "hidden",
    background: "rgba(0,0,0,0.2)",
  },

  sidebar: {
    width: "260px",
    background: "#022c1a",
    padding: "15px",
    overflowY: "auto",
  },

  title: {
    color: "#ffd54f",
    marginBottom: "15px",
  },

  noUsers: {
    opacity: 0.7,
    marginTop: "20px",
    color: "#fff",
  },

  user: {
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  badge: {
    background: "crimson",
    color: "#fff",
    borderRadius: "50%",
    minWidth: "22px",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
  },

  chatArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background:
      "linear-gradient(135deg,#033d24,#046b3b,#000)",
  },

  header: {
    padding: "16px",
    color: "#ffd54f",
    fontWeight: "bold",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)",
  },

  messages: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  bubble: {
    padding: "12px 14px",
    borderRadius: "14px",
    maxWidth: "70%",
  },

  time: {
    display: "block",
    marginTop: "5px",
    fontSize: "10px",
    opacity: 0.7,
  },

  iconBtn: {
    border: "none",
    borderRadius: "6px",
    padding: "5px",
    cursor: "pointer",
    background:
      "rgba(255,255,255,0.12)",
  },

  inputRow: {
    display: "flex",
    gap: "10px",
    padding: "15px",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "none",
  },

  send: {
    padding: "12px 18px",
    borderRadius: "10px",
    border: "none",
    background: "#ffd54f",
    fontWeight: "bold",
    cursor: "pointer",
  },

  empty: {
    margin: "auto",
    opacity: 0.7,
    fontSize: "18px",
    color: "#fff",
  },
};