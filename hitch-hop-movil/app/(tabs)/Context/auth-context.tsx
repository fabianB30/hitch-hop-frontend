import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerRequest, loginRequest, User } from "../../../interconnection/user";

interface AuthContextType {
  signUp: (userData: User) => Promise<void>;
  signIn: (userData: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (newUser: User) => Promise<void>;
  loading: boolean;
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
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

  const signUp = async (userData: User) => {
    setLoading(true);
    try {
      const res = await registerRequest(userData);
      if (res) {
        const newUser: User = res;
        setUser(newUser);
        setIsAuthenticated(true);
        setErrors([]);
        await AsyncStorage.setItem("user", JSON.stringify(newUser));
        return newUser;
      }
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
      if (res) {
        const newUser: User = res;
        setUser(newUser);
        setIsAuthenticated(true);
        setErrors([]);
        await AsyncStorage.setItem("user", JSON.stringify(newUser));
        return newUser;
      } else {
        throw new Error('No se recibió respuesta del servidor');
      }
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

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem("user");
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
        updateUser,
        logout,
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