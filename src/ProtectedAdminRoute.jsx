import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({
  children,
}) {
  const admin =
    localStorage.getItem("jni_admin");

  if (!admin) {
    return (
      <Navigate to="/admin-login" />
    );
  }

  return children;
}