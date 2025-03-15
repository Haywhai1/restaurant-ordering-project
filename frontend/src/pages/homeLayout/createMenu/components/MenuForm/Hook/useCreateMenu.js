import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCurrentUser } from "../../../../../../shared/hooks/useGetCurrentUser";
import { apiClient } from "../../../../../../shared/hooks/client";


export const useCreateMenu = ({ menu }) => {
  const { user } = useGetCurrentUser();
  const navigate = useNavigate();
  const { menuId } = useParams(); // Get the menuId from URL params
  const [isLoading, setIsLoading] = useState(false);

  const obj = {
    name: "",
    category: "Appetizer",
    price: 0,
    image: "",
    available: true,
  };

  const [formData, setFormData] = useState(menu ? { ...obj, ...menu } : obj);

  const categories = [
    "Appetizer",
    "Main Course",
    "Dessert",
    "Beverage",
    "Drinks",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    // Check if the user is an admin
    if (user.role !== "admin") {
      alert("You must be an admin to create a menu item.");
      setIsLoading(false);
      return;
    }

    const menuData = {
      ...formData,
      createdBy: user._id,
    };

    try {
      let response;
      const url = menu
        ? `/menu/${menuId}`
        : "/menu"; 

      const method = menu ? "patch" : "post"; 
      response = await apiClient[method](url, menuData);
      console.log("Full response from server:", response); 

      if (response && response.data) {
        console.log("Response Data:", response.data);
        alert("Menu item " + (menu ? "updated" : "created") + " successfully!");
        navigate("/home");
      } else {
        console.error("Unexpected response format:", response);
        alert("Unexpected response format from server.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      if (error.response) {
        if (error.response.status === 401) {
          alert("Session expired or unauthorized. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          alert("Something went wrong on the server!");
        }
      } else {
        alert("Network error: Could not reach the server.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, categories, handleChange, handleSubmit, isLoading };
};
