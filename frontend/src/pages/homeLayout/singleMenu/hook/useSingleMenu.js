import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../../../../shared/hooks/useGetCurrentUser";

const useSingleMenu = () => {
     const { isLoading, user, logout } = useGetCurrentUser();
      const { menuId } = useParams();
      const [menu, setMenu] = useState(null);
      const [loading, setLoading] = useState(true); 
      const navigate = useNavigate(); 
    
      useEffect(() => {
        const fetchMenu = async () => {
          try {
            const response = await fetch(
              `http://localhost:4000/api/v1/menu/${menuId}`
            );
            const data = await response.json();
            if (response.ok && data) {
              setMenu(data); // Set the fetched menu data if successful
            } else {
              setMenu(null); // Set to null if not found or error in response
            }
          } catch (error) {
            console.error("Error fetching menu:", error);
            setMenu(null); // Set to null in case of an error
          } finally {
            setLoading(false); // Set loading to false after fetch completes
          }
        };
    
        fetchMenu();
      }, [menuId]);
    
      const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this menu item?")) {
          try {
            const token = localStorage.getItem("token"); // Get the token for authorization
            const response = await fetch(
              `http://localhost:4000/api/v1/menu/${menuId}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`, // Send the token in the headers for authorization
                },
              }
            );
    
            if (response.ok) {
              alert("Menu item deleted successfully!");
              navigate("/home"); // Redirect to home after deletion
            } else {
              alert("Failed to delete the menu item.");
            }
          } catch (error) {
            console.error("Error deleting menu:", error);
            alert("Something went wrong while deleting the menu item.");
          }
        }
      };
  return { handleDelete, isLoading, user, logout,menuId, menu, loading}
}

export default useSingleMenu