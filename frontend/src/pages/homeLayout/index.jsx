import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../../shared/hooks/useGetCurrentUser";
import { useState, useEffect } from "react";
import { FaBars, FaHome, FaSignOutAlt, FaUser, FaClipboardList, FaPlusCircle } from "react-icons/fa";

const HomeLayout = () => {
  const { isLoading, user, logout } = useGetCurrentUser();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLoginRedirect = () => navigate("/login");
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

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
        <button onClick={handleLoginRedirect} className="text-blue-500 hover:underline">
          Login here
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for Desktop | Top Navbar for Mobile */}
      <div
        className={`bg-white text-black transition-all duration-300 ${
          isMobile
            ? "fixed top-0 left-0 right-0 shadow-md flex justify-between items-center py-3 px-6 z-20"
            : `fixed left-0 top-0 h-full flex flex-col p-6 transition-all duration-300 ${
                sidebarOpen ? "w-52" : "hidden"
              }`
        }`}
      >
        {!isMobile && (
          <h2 className="text-2xl font-bold text-blue-700 mb-8 text-center">RolaKitchen</h2>
        )}

<div className={`flex gap-4 ${isMobile ? "gap-6" : "flex-col"}`}>
  <NavLink
    to="/home"
    className={({ isActive }) =>
      `flex items-center text-blue-400 px-3 py-2 rounded-md ${
        isActive && !isMobile ? "bg-gray-100 text-blue-800 font-bold" : ""
      }`
    }
    end
  >
    <FaHome className="mr-3" size={isMobile ? 26 : 20} />
    {isMobile ? "" : "Home"}
  </NavLink>

  <NavLink
    to="/home/profile"
    className={({ isActive }) =>
      `flex items-center text-blue-400 px-3 py-2 rounded-md ${
        isActive && !isMobile ? "bg-gray-100 text-blue-800 font-bold" : ""
      }`
    }
  >
    <FaUser className="mr-3" size={isMobile ? 26 : 20} />
    {isMobile ? "" : "My Profile"}
  </NavLink>

  {user?.role === "admin" && (
    <NavLink
      to="/home/create-menu"
      className={({ isActive }) =>
        `flex items-center text-blue-400 px-3 py-2 rounded-md ${
          isActive && !isMobile ? "bg-gray-100 text-blue-800 font-bold" : ""
        }`
      }
    >
      <FaPlusCircle className="mr-3" size={isMobile ? 26 : 20} />
      {isMobile ? "" : "Post-Menu"}
    </NavLink>
  )}

  {user?.role === "user" && (
    <NavLink
      to="/home/orders"
      className={({ isActive }) =>
        `flex items-center text-blue-400 px-3 py-2 rounded-md ${
          isActive && !isMobile ? "bg-gray-100 text-blue-800 font-bold" : ""
        }`
      }
    >
      <FaClipboardList className="mr-3" size={isMobile ? 26 : 20} />
      {isMobile ? "" : "Orders"}
    </NavLink>
  )}
</div>


        {/* Logout Button (Flex-Grow only for Desktop) */}
        {!isMobile && <div className="flex-grow"></div>}

        <button
          onClick={logout}
          className={`flex items-center ${
          isMobile ? "px-2 py-1 text-sm" : "px-6 py-2"
          } bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300`}
>
          <FaSignOutAlt className="mr-2" size={isMobile ? 16 : 20} />
          {isMobile ? "Logout" : "Logout"}
        </button>

      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 relative ${
          isMobile ? "mt-16" : sidebarOpen ? "ml-52" : "ml-0"
        }`}
      >
        {/* Toggle Button (Always in Main Content) */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute top-5 left-5 bg-blue-300 text-white p-3 rounded-full transition-all"
          >
            <FaBars size={20} />
          </button>
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
