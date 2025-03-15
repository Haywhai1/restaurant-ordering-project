import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../../../shared/hooks/useGetCurrentUser";

const Profile = () => {
  const { user, isLoading, logout } = useGetCurrentUser();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!user) {
    return navigate("/login");
  }

  return (
<div className="flex items-center justify-center h-screen p-4 bg-gray-100">
  <div className="w-full max-w-lg bg-white shadow-lg rounded-lg shadow-2xl p-8 relative">
    {/* Logout Button */}
    <button
      onClick={logout}
      className="absolute top-4 right-4 px-5 py-2 text-sm font-semibold text-gray-900 bg-red-600 rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
    >
      Logout
    </button>

    {/* User Greeting */}
    <h2 className="mt-4 text-3xl font-bold text-center text-black">
  Welcome,{" "}
  <span
    className={`${
      user?.role === "admin" ? "text-green-200" : "text-indigo-500"
    }`}
  >
    {user?.username.charAt(0).toUpperCase() + user?.username.slice(1)}
  </span>{" "}
  👋
</h2>


    {/* Profile Section */}
    <div className="mt-6 flex flex-col items-center">
      {/* Profile Image */}
      <div
        className={`w-32 h-32 rounded-full flex items-center justify-center text-3xl font-semibold text-white shadow-lg mb-4 ${
          user?.role === "admin" ? "bg-green-600" : "bg-indigo-500"
        }`}
      >
        {user?.username?.charAt(0).toUpperCase()}
      </div>

      {/* User Role */}
      <span
        className={`px-4 py-2 text-sm font-medium rounded-full mb-6 ${
          user?.role === "admin"
            ? "bg-green-600 text-white"
            : "bg-indigo-600 text-white"
        }`}
      >
        {user?.role?.toUpperCase()}
      </span>
    </div>

    {/* User Info Section */}
    <div className="space-y-6">
      {/* Email */}
      <div className="flex justify-between items-center text-gray-400 border-b pb-3">
        <span className="font-medium text-gray-500">Email:</span>
        <span className="font-semibold text-black">{user?.email}</span>
      </div>

      {/* Verified Status */}
      <div className="flex justify-between items-center text-gray-400 border-b pb-3">
        <span className="font-medium text-gray-500">Verified:</span>
        <span
          className={`font-semibold ${
            user?.isVerified ? "text-green-400" : "text-red-500"
          }`}
        >
          {user?.isVerified ? "Yes" : "No"}
        </span>
      </div>

      {/* Join Date */}
      <div className="flex justify-between items-center text-gray-400 pb-3">
        <span className="font-medium text-gray-500">Joined:</span>
        <span className="font-semibold text-black">
          {new Date(user?.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  </div>
</div>

  
  );
};

export default Profile;
