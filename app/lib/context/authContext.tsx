import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { changePassword, getUser, signIn, signUp } from "../data";
import { User } from "../definitions";

export type authContextType = {
  user: User | null;
  isAuthModalOpen?: boolean;
  loading: boolean;
  setAuthModalOpen: (isOpen: boolean) => void;
  openAuthModal: () => void;
  closeAuthModal?: () => void;
  handleSignIn: (email: string, password: string) => void;
  handleSignUp: (email: string, password: string) => void;
  handleSignOut: () => void;
  handleChangePassword: (
    currentPassword: string,
    newPassword: string,
    passwordConfirmation: string
  ) => void;
};

const authContext = createContext<authContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("accessToken")) {
        try {
          const user = await getUser();
          setUser(user);
        } catch (error) {
          console.log(error);
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const res = await signIn(email, password);
      localStorage.setItem("accessToken", res.jwt);
      setUser(res.user);
    } catch (error) {
      throw error;
    }
  };
  const handleSignUp = async (email: string, password: string) => {
    try {
      const res = await signUp(email, password);
      if (res.user) {
        handleSignIn(email, password);
      }
    } catch (error) {
      throw error;
    }
  };
  const handleSignOut = async () => {
    localStorage.setItem("accessToken", "");
    setUser(null);
  };

  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string,
    passwordConfirmation: string
  ) => {
    try {
      const res = await changePassword(
        currentPassword,
        newPassword,
        passwordConfirmation
      );
      localStorage.setItem("accessToken", res.jwt);
      setUser(res.user);
    } catch (error) {
      console.log("error in the auth context:", error);
      throw error;
    }
  };

  const setAuthModalOpen = (isOpen: boolean) => {
    setIsAuthModalOpen(isOpen);
  };

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <authContext.Provider
      value={{
        user,
        isAuthModalOpen,
        setAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        loading,
        handleSignIn,
        handleSignUp,
        handleSignOut,
        handleChangePassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(authContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
}
