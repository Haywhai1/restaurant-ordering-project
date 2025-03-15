import { useEffect, useState } from "react";
import { useGetCurrentUser } from "../../../../shared/hooks/useGetCurrentUser";  // Adjust the path as necessary
import { apiClient } from "../../../../shared/hooks/client";


 const useHome = () => {
     const { isLoading, user } = useGetCurrentUser();
      const [menus, setMenus] = useState([]);
      const [isDataLoaded, setIsDataLoaded] = useState(false);
      const [selectedCategory, setSelectedCategory] = useState("all");
      const [searchQuery, setSearchQuery] = useState("");
      const [animationKey, setAnimationKey] = useState(0);
    
      useEffect(() => {
        const fetchMenus = async () => {
          const category = selectedCategory === "all" ? "" : selectedCategory;
          const search = searchQuery ? `&search=${searchQuery}` : "";
          try {
            const response = await apiClient.get(`/menu?category=${category}${search}`);
            
            if (response.status >= 200 && response.status < 300) {
              const data = response.data;
              setMenus(data);
              setIsDataLoaded(true);
              setAnimationKey(prevKey => prevKey + 1);
            } else {
              throw new Error("Failed to fetch menus");
            }
          } catch (error) {
            console.error("Error fetching menus:", error);
            setIsDataLoaded(true);
          }
        };
      
        fetchMenus();
      }, [selectedCategory, searchQuery]);
      
    
     
      const handleOrder = async (menuId) => {
        if (!user) {
          alert("Please log in to place an order.");
          return;
        }
      
        try {
          const response = await apiClient.post("/orders/addOrder", {
            userId: user._id,
            menuId: menuId,
          });
    
          const data = response.data;
      
          if (data.message.includes("Please increase the quantity instead")) {
            alert(data.message);
          } else {
            alert(`You have placed an order for ${data.order.name}`);
          }
        } catch (error) {
          console.error("Error placing order:", error);
          alert("There was an error placing your order. Please try again.");
        }
      };
      
  return {isLoading, user, handleOrder, setSearchQuery, setSelectedCategory, menus, isDataLoaded, selectedCategory, searchQuery, animationKey};
}

export default useHome; 