import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableConfiguration from "./componentes/TableConfiguration";
import NumberTable from "./componentes/NumberTable";
import UserNavbar from "./componentes/NavbarUser";
import UsersList from "./componentes/UsersList";
import UserRegistrationForm from "./componentes/UserRegistrationForm";

const App: React.FC = () => {
  return (
    <Router>
      <UserNavbar />
      <Routes>
        <Route path="/" element={<UserRegistrationForm />} />
        <Route path="/config" element={<TableConfiguration />} />
        <Route path="/numbers" element={<NumberTable />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </Router>
  );
};

export default App;
