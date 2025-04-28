import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/CartPage";
import RegisterPage from "../pages/RegisterPage";

const routes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/register", element: <RegisterPage /> },
];

export default routes;
