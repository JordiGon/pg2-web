import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ redirectPath = "/", children }) => {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  if (isAuthenticated === false) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
