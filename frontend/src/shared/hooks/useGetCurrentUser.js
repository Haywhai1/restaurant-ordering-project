import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "./client";

export const useGetCurrentUser = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    setIsLoading(true);

    try {
      const res = await apiClient.get("/users/currentUser");
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    apiClient.defaults.headers["Authorization"] = "";
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
    getCurrentUser();
  }, []);

  return {
    user,
    isLoading,
    logout,
  };
};
