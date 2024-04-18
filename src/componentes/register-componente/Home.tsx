import React, { useState } from "react";
import { Button } from "@mui/material";
import UserLoginForm from "./LoginDialog";
import UserRegistrationForm from "./UserRegistrationForm";

const Home: React.FC = () => {
  const [showRegistrationForm, setShowRegistrationForm] =
    useState<boolean>(false);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);

  const handleRegisterButtonClick = () => {
    setShowRegistrationForm(true);
  };

  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
  };

  const handleCloseRegistrationForm = () => {
    setShowRegistrationForm(false);
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };

  return (
    <>
      <Button onClick={handleRegisterButtonClick} variant="outlined">
        Register
      </Button>
      <Button onClick={handleLoginButtonClick} variant="outlined">
        Login
      </Button>

      {showRegistrationForm && (
        <UserRegistrationForm onClose={handleCloseRegistrationForm} />
      )}

      {showLoginForm && (
        <UserLoginForm open={true} onClose={handleCloseLoginForm} />
      )}
    </>
  );
};

export default Home;
