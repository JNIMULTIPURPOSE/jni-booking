import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({
  children,
}) {
  const adminToken =
    localStorage.getItem(
      "jni_admin_token"
    );

  if (!adminToken) {
    return (
      <Navigate to="/admin-login" />
    );
  }

  return children;
}