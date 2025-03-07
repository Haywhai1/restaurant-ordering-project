import { useNavigate } from 'react-router-dom';
import { useLogin } from "./hook/useLogin";

const Login = () => {

  const { formData, erorrMessage, handleChange, handleSubmit } = useLogin();
  const navigate = useNavigate(); 
  
// Navigate to the Register page ("/" route)
  const handleRegisterRedirect = () => {
    navigate("/"); 
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={formData.email}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={formData.password}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">Login</button>
          </div>
          <p className="text-red-500">{erorrMessage}</p>
        </form>

        <div className="text-center">
          <p className="text-sm">Don't have an account?  
            <button 
              onClick={handleRegisterRedirect} 
              className="text-blue-500 hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
