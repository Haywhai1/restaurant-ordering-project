import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");  // Corrected errorMessage
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log(formData);

    try {
      const url = "http://localhost:4000/api/v1/users/register";
      const response = await axios.post(url, formData);
      console.log(response, "response");

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Registration successful!");
        navigate("/home");
      } else {
        alert("Registration successful, but no token returned.");
      }
    } catch (error) {
      console.error("Error:", error);
      
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "An error occurred.");
      } else {
        setErrorMessage("An error occurred.");
      }
    }
  };

  return { formData, errorMessage, handleChange, handleSubmit };
};
