import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import PropTypes from "prop-types";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from "../services/auth";
import { UserRegistrationData } from "../model/UserRegistrationData";

interface AuthContextProps {
  user: UserRegistrationData | null;
  loading: boolean;
  signup: (userData: UserRegistrationData) => Promise<void>;
  signIn: (credentials: UserRegistrationData) => Promise<void>;
  isAuthenticated: boolean;
  authErrors: { field: string; message: string }[];
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de un provider AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserRegistrationData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authErrors, setAuthErrors] = useState<
    { field: string; message: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const signup = async (userData: UserRegistrationData): Promise<void> => {
    try {
      const response = await registerRequest(userData);
      if (response && response.data) {
        const { data } = response;
        setUser(data);
        setIsAuthenticated(false);
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signIn = async (credentials: UserRegistrationData): Promise<void> => {
    try {
      const response = await loginRequest(credentials);
      if (response && response.data && response.headers) {
        const { data, headers } = response;
        if (headers.authorization) {
          const token = headers.authorization.split(" ")[1];
          localStorage.setItem("token", token);
          setUser(data);
          setIsAuthenticated(true);
        } else {
          // Manejar el caso si no hay token en la respuesta
          console.error("El servidor no proporcionó un token de autorización.");
        }
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error: any): void => {
    if (error.response && error.response.data) {
      const responseData = error.response.data;
      if (responseData.errors) {
        const yupErrors = responseData.errors.map((err: any) => ({
          field: err.field,
          message: err.message,
        }));
        setAuthErrors(yupErrors);
      } else if (responseData.message) {
        if (responseData.message === "El correo electrónico ya está en uso") {
          setAuthErrors([
            { field: "email", message: "El correo electrónico ya está en uso" },
          ]);
        } else {
          setAuthErrors([{ field: "network", message: responseData.message }]);
        }
      } else {
        setAuthErrors([{ field: "network", message: "Error desconocido" }]);
      }
    } else {
      setAuthErrors([{ field: "network", message: "Error de red" }]);
    }
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    console.log(localStorage);
    setUser(null);
    setIsAuthenticated(false);
    setAuthErrors([]);
  };

  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(token);

        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al verificar el token:", error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        signIn,
        isAuthenticated,
        authErrors,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
