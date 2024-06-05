import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableConfiguration from "./pages/TableConfigurationPage";
import NumberTable from "./pages/NumbersTablePage";
import UserNavbar from "./componentes/NavbarUser";
import UsersList from "./pages/UsersListPage";
import HomePages from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./context/authContext";
import ClientProvider from "./context/clientsContext";
import "tailwindcss/tailwind.css";
import "./index.css";
import Footer from "./componentes/Footer";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ClientProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <UserNavbar />
            <div className="flex-grow mt-16">
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
            </div>
            <Footer />
          </div>
        </Router>
      </ClientProvider>
    </AuthProvider>
  );
};

export default App;
