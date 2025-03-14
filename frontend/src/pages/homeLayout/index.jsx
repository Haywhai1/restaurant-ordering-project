import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../../shared/hooks/useGetCurrentUser";
import { useState } from "react";
import { FaBars, FaHome, FaSignOutAlt, FaUser, FaClipboardList, FaPlusCircle } from "react-icons/fa"; // Importing the new icon for post-menu

const HomeLayout = () => {
  const { isLoading, user, logout } = useGetCurrentUser();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar open/close
  };

  if (isLoading) {
    return (
      <div className="flex items-center text-black justify-center min-h-screen font-bold text-xl">
        Loading...
      </div>
    );
  }
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Please log in to access the dashboard.
        <button
          onClick={handleLoginRedirect}
          className="text-blue-500 hover:underline"
        >
          Login here
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (Left Navbar) */}
      <div
        className={`${
          sidebarOpen ? "w-52" : "w-0" // Sidebar width 0 when closed
        } bg-white text-black flex flex-col p-6 fixed left-0 top-0 h-full z-10 transition-all duration-300 overflow-hidden ${
          sidebarOpen ? "block" : "hidden" // Hide the sidebar when collapsed
        }`}
      >
        {/* Sidebar content */}
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-700">RolaKitchen</h2>

        {/* Home Button with Icon */}
        <NavLink
          to="/home"
          end
          className={({ isActive }) =>
            isActive
              ? "mb-4 flex items-center px-6 py-2 bg-gray-200 text-blue-400 rounded-lg transition duration-300"
              : "mb-4 flex items-center px-6 py-2 text-blue-400 rounded-lg hover:bg-gray-100 transition duration-300"
          }
        >
          <FaHome className="mr-3 text-blue-300" size={20} />
          Home
        </NavLink>

        {/* Profile Button with Icon */}
        <NavLink
          to="/home/profile"
          className={({ isActive }) =>
            isActive
              ? "mb-4 flex items-center px-6 py-2 bg-gray-200 text-blue-400 rounded-lg transition duration-300"
              : "mb-4 flex items-center px-6 py-2 text-blue-400 rounded-lg hover:bg-gray-100 transition duration-300"
          }
        >
          <FaUser className="mr-3 text-blue-300" size={20} />
          My Profile
        </NavLink>

        {/* Create Menu Button (Post-Menu) - Visible only for Admin */}
        {user?.role === "admin" && (
          <NavLink
            to="/home/create-menu"
            className={({ isActive }) =>
              isActive
                ? "mb-4 flex items-center px-6 py-2 bg-gray-200 text-blue-400 rounded-lg transition duration-300"
                : "mb-4 flex items-center px-6 py-2 text-blue-400  rounded-lg hover:bg-gray-100 transition duration-300"
            }
          >
            <FaPlusCircle className="mr-3 text-blue-300" size={20} />
            Post-Menu
          </NavLink>
        )}

        {/* Orders Button with Icon */}
        {user?.role === "user" && (
          <NavLink
            to="/home/orders"
            className={({ isActive }) =>
              isActive
                ? "mb-4 flex items-center px-6 py-2 bg-gray-200 text-blue-400 rounded-lg transition duration-300"
                : "mb-4 flex items-center px-6 py-2 text-blue-400  rounded-lg hover:bg-gray-100 transition duration-300"
            }
          >
            <FaClipboardList className="mr-3 text-blue-300" size={20} />
            Orders
          </NavLink>
        )}

        {/* Spacer to push logout to the bottom */}
        <div className="flex-grow"></div> {/* This pushes the logout button to the bottom */}

        {/* Logout Button with Icon */}
        <button
          onClick={logout}
          className="mb-4 flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
        >
          <FaSignOutAlt className="mr-3" size={20} />
          Logout
        </button>
      </div>

      {/* Content Area (Right Side) */}
      <div
        className={`flex-1 overflow-y-auto relative transition-all duration-300 ${
          sidebarOpen ? "ml-52" : "ml-0" // Shift content when sidebar opens
        }`}
      >
        {/* Toggle Button Positioned Inside Main Content */}
        <button
          onClick={toggleSidebar}
          className="absolute top-5 left-5 bg-blue-300 text-white p-3 rounded-full z-20"
        >
          <FaBars size={20} />
        </button>

        {/* Main Content */}
        <div className="bg-gray-100 shadow-lg border-2 border-t-0 min-h-screen content-center ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
