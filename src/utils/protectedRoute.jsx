import { Navigate } from "react-router-dom";
import { useUser } from "../utils/zustand";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    toast.error("You should login first!");
    return <Navigate to="/login" />;
  }

  return children;
}
