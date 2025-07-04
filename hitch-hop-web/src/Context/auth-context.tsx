import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerRequest, loginRequest } from "../interconnection/user";

export type User = {
  name: string;
  firstSurname: string;
  secondSurname: string;
  username: string;
  email: string;
  password: string;
  institutionId: string;
  identificationTypeId?: "Cedula" | "DIMEX" | "Pasaporte";
  identificationNumber?: number;
  birthDate: string;
  genre?: "Masculino" | "Femenino" | "Otro";
  photoKey?: string;
  photoUrl?: string;
  phone?: number;
  type: "Administrador" | "Usuario" | "Inactivo - Admin" | "Inactivo - User";
  role: "Conductor" | "Pasajero";
  vehicles: string[]; // array id
  notifications: {
    title: string;
    subtitle: string;
    timestamp?: string;
  }[];
};

interface AuthContextType {
  signUp: (userData: UserData) => Promise<void>;
  signIn: (userData: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (newUser: User) => Promise<void>;
  loading: boolean;
  user: UserData | null;
  isAuthenticated: boolean;
  errors: string[];
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser: UserData = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.log("Error al cargar sesión:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const signUp = async (userData: UserData) => {
    setLoading(true);
    try {
      const res = await registerRequest(userData);
      const newUser: UserData = res;
      setUser(newUser);
      setIsAuthenticated(true);
      setErrors([]);
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    } catch (error: any) {
      if (error.response?.data?.messages) {
        setErrors(error.response.data.messages);
      } else {
        setErrors(["Error inesperado. Inténtalo de nuevo."]);
      }
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await loginRequest(credentials);
      const newUser: UserData = res;
      setUser(newUser);
      setIsAuthenticated(true);
      setErrors([]);
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    } catch (error: any) {
      if (error.response?.data?.messages) {
        setErrors(error.response.data.messages);
      } else {
        setErrors(["Error inesperado. Inténtalo de nuevo."]);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (newUser: User) => {
    try {
      setUser(newUser);
      setIsAuthenticated(true);
      setErrors([]);
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
    } catch (err) {
      console.log("Error al actualizar usuario:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem("user");
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        logout,
        updateUser,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;