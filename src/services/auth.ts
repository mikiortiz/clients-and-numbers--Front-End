import axios from "./axios";
import { UserRegistrationData } from "../model/UserRegistrationData";

export const registerRequest = (user: UserRegistrationData) =>
  axios.post(`/register`, user);

export const loginRequest = (user: UserRegistrationData) =>
  axios.post(`/login`, user);

export const verifyTokenRequest = (token: string) =>
  axios.get(`/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
