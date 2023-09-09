import { useContext } from "react";
import { Navigate } from "react-router-dom";
import MainContext from "./contextApi/MainContext";

export default function PrivateOutlet({ children }) {
  const { user } = useContext(MainContext);

  if (!user) return <Navigate to="/" />;

  return !user?.quizDone ? children : <Navigate to="/certificate" />;
}
