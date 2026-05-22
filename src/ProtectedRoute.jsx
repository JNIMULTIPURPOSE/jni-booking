import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}) {
  const token =
    localStorage.getItem("jni_token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}