import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const AuthPage = ({ children }) => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);
  return children;
};

export default AuthPage;
