import React, { useState } from "react";
import MyApiRegister from "../services/MyApiRegister"; // Importa el componente correcto
import UserRegistrationData from "../model/UserRegistrationData";

const UserRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<UserRegistrationData>({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { username, email, password } = formData;
      const newUser = await MyApiRegister.register(username, email, password); // Utiliza la función correcta de MyApiRegister
      console.log("Usuario registrado exitosamente:", newUser);
      // Aquí puedes redirigir a otra página o mostrar un mensaje de éxito
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default UserRegistrationForm;
