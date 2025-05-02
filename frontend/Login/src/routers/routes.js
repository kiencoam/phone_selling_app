import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/CartPage";
import RegisterPage from "../pages/RegisterPage";
import OrderConfirmation from "../pages/OrderConfirmation";

const routes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/order-confirmation", element: <OrderConfirmation /> },
];

export default routes;
