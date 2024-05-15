import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";
function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();
  console.log(loading, isAuthenticated);

  console.log("protectedRoute validacion:", isAuthenticated);

  if (loading) return <h1>Cargando...</h1>;

  if (!loading && !isAuthenticated) return <Navigate to={"/login"} replace />;
  return <Outlet />;
}

export default ProtectedRoute;
