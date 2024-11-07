import { Navigate } from "react-router-dom";
import { useUser } from "../utils/zustand";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
