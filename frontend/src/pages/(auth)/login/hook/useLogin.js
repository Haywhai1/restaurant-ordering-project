import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const [erorrMessage, seterorrMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    console.log(formData);

    try {
      const url = "http://localhost:4000/api/v1/users/login";
      const response = await axios.post(url, formData);
      console.log(response, "response");
      localStorage.setItem("token", response.data.token);

      if (response.data) {
        // alert("Login successful!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        seterorrMessage(error.response.data.error);
      } else {
        seterorrMessage("Network error, please try again later.");
      }
    }
  };

  return { formData, erorrMessage, handleChange, handleSubmit };
};
