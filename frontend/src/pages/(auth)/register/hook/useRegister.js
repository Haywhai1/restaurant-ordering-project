import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../../../shared/hooks/client";

export const useRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Corrected errorMessage
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check for password match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    // Ensure all required fields are filled
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    console.log(formData);

    try {
      const response = await apiClient.post("/users/register", formData);

      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert("Registration successful, but no token returned.");
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "An error occurred.");
      } else {
        setErrorMessage("Network error, please try again later.");
      }
    } finally{
      setLoading(false);
    }
  };

  return { loading, formData, errorMessage, handleChange, handleSubmit };
};
