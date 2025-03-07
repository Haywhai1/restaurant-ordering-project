import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCurrentUser } from "../../../../../../shared/hooks/useGetCurrentUser";

export const useCreateMenu = ({ menu }) => {
  const { user } = useGetCurrentUser();
  const navigate = useNavigate();
  const { menuId } = useParams();  // Get the menuId from URL params
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

    const token = localStorage.getItem("token");
    console.log("Token in request:", token);

    try {
      let response;

      // Check if menu is passed, indicating we need to update the menu item
      const url = menu
        ? `http://localhost:4000/api/v1/menu/${menuId}` // Update if menu exists
        : "http://localhost:4000/api/v1/menu"; // Create if no menu exists

      const method = menu ? "patch" : "post"; // Use PATCH for update, POST for create

      response = await axios[method](url, menuData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Full response from server:", response); // Log the whole response object

      // Check if response is valid before accessing response.data
      if (response && response.data) {
        console.log("Response Data:", response.data);
        alert("Menu item " + (menu ? "updated" : "created") + " successfully!");
        navigate("/home");
      } else {
        // Handle case where response is not as expected
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
