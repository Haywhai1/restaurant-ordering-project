import { useEffect, useState } from "react";
import { useGetCurrentUser } from "../../../../shared/hooks/useGetCurrentUser";  // Adjust the path as necessary


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
            const response = await fetch(`http://localhost:4000/api/v1/menu?category=${category}${search}`);
            if (!response.ok) {
              throw new Error("Failed to fetch menus");
            }
            const data = await response.json();
            setMenus(data);
            setIsDataLoaded(true);
            setAnimationKey(prevKey => prevKey + 1);
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
          const response = await fetch("http://localhost:4000/api/v1/orders/addOrder", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user._id,  // Send the logged-in user's ID
              menuId: menuId,    // Send the selected menu item's ID
            }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            if (data.message.includes("Please increase the quantity instead")) {
              // Check if 'existingOrder' and 'quantity' exist before accessing them
              const existingOrder = data.existingOrder;
              const quantityMessage = existingOrder && existingOrder.quantity
                ? `Current quantity: ${existingOrder.quantity}`
                : "Quantity data not available.";
              alert(`${data.message} ${quantityMessage}`);
            } else {
              alert(`You have placed an order for ${data.order.name} (${data.order.price})`);
            }
          } else {
            alert(data.message);  // Show error message
          }
        } catch (error) {
          console.error("Error placing order:", error);
          alert("There was an error placing your order. Please try again.");
        }
      };
  return {isLoading, user, handleOrder, setSearchQuery, setSelectedCategory, menus, isDataLoaded, selectedCategory, searchQuery, animationKey};
}

export default useHome; 