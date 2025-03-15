import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../../../shared/hooks/client"; 

export const useLogin = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/users/login", formData); 
      console.log(response, "response");
      const token = response.data.token;
      localStorage.setItem("token", token);
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Network error, please try again later.");
      }
    }
  };

  return { formData, errorMessage, handleChange, handleSubmit };
};
