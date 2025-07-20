import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get(API_ROUTES.DEALER.GET_MY_PROFILE, {
        withCredentials: true,
      });

      if (res.data && res.data.user) {
        setUser(res.data.user);
        setUserId(res.data.user._id);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, refetchUser: fetchUser, userId }}
    >
      {children}
    </UserContext.Provider>
  );
};
