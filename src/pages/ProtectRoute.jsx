import { useEffect } from "react";
import { useAuth } from "../Contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? children : null;
}
