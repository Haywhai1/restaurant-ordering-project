import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../../../shared/hooks/useGetCurrentUser";
import MenuForm from "../createMenu/components/MenuForm";
import { FaTrash } from "react-icons/fa";  // Import React Icon (trash icon)

const SingleMenu = () => {
  const { isLoading, user, logout } = useGetCurrentUser();
  const { menuId } = useParams();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const navigate = useNavigate(); // Use navigate to redirect after deletion

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

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center text-black justify-center min-h-screen font-bold text-xl">
        Loading...
      </div>
    );
  }

  // If menu is not found (after fetching), show "Menu not found"
  if (!menu) {
    return (
      <div className="flex items-center text-black justify-center min-h-screen font-bold text-xl">
        Menu not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 relative">
      {/* Delete icon only visible for admins */}
      {user?.role === "admin" && (
        <div
          className="absolute top-4 right-4 cursor-pointer text-red-600 hover:text-red-800"
          onClick={handleDelete}
        >
          <FaTrash className="text-3xl" /> {/* React Icons delete icon */}
        </div>
      )}

      {/* Menu Image */}
      <img
        src={menu.image}
        alt={menu.name}
        className="w-64 h-32 object-cover rounded-lg mb-4"
      />

      {/* Menu Name */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{menu.name}</h1>

      {/* Menu Price */}
      <p className="text-xl text-gray-600 mb-6">Price: ${menu.price}</p>

      {/* Place Order Button for Users */}
      {user?.role === "user" && (
        <button
          onClick={() => alert("Order placed")}
          className="w-full sm:w-auto py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Place Order
        </button>
      )}

      {/* Menu Form for Admins to Update */}
      {user?.role === "admin" && menu && (
          <MenuForm menu={menu} title={"Update"} />
      )}

    </div>
  );
};

export default SingleMenu;
