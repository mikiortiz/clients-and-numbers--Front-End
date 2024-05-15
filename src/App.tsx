import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableConfiguration from "./componentes/TableConfiguration";
import NumberTable from "./componentes/NumberTable";
import UserNavbar from "./componentes/NavbarUser";
import UsersList from "./componentes/UsersList";
import HomePages from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./context/authContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <UserNavbar />
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/config" element={<TableConfiguration />} />
            <Route path="/numbers" element={<NumberTable />} />
            <Route path="/users" element={<UsersList />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
