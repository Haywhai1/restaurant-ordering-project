import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../../../../shared/hooks/useGetCurrentUser";
import { apiClient } from "../../../../shared/hooks/client";

const useSingleMenu = () => {
     const { isLoading, user, logout } = useGetCurrentUser();
      const { menuId } = useParams();
      const [menu, setMenu] = useState(null);
      const [loading, setLoading] = useState(true); 
      const navigate = useNavigate(); 
    
      useEffect(() => {
        const fetchMenu = async () => {
          setLoading(true); 
          try {
            const response = await apiClient.get(`/menu/${menuId}`);
            const data = response.data;
           
            if (response.status >= 200 && response.status < 300 && data) {
              setMenu(data);
            } else {
              setMenu(null); 
            }
          } catch (error) {
            console.error("Error fetching menu:", error);
            setMenu(null);
          } finally {
            setLoading(false); 
          }
        };
      
        fetchMenu();
      }, [menuId]);
      
    
      const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this menu item?")) {
          try {
            const response = await apiClient.delete(`/menu/${menuId}`);
    
            if (response.status >= 200 && response.status <= 299) {
              alert("Menu item deleted successfully!");
              navigate("/home"); 
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