import { Route, Routes } from "react-router-dom";
import AuthLayout from "./pages/(auth)/authLayout";
import Register from './pages/(auth)/register';
import Login from "./pages/(auth)/login/index";
import HomeLayout from "./pages/homeLayout";
import Home from "./pages/homeLayout/home/index";
import Orders from "./pages/homeLayout/orders";
import CreateMenu from "./pages/homeLayout/createMenu";
import SingleMenu from "./pages/homeLayout/singleMenu";
import Profile from "./pages/homeLayout/profile";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Register/>} />
        <Route path="login" element={<Login />} />
      </Route>


      <Route path="/home" element={<HomeLayout />}>
        <Route index element={<Home/>} />
      <Route path="/home/profile" element={<Profile />} />
      <Route path="/home/orders" element={<Orders />} />
      <Route path="/home/create-menu" element={<CreateMenu />} />
      <Route path="/home/menu/:menuId" element={<SingleMenu />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>

    </Routes>

  );
}

export default App;
