import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/CartPage";
import RegisterPage from "../pages/RegisterPage";
import OrderConfirmation from "../pages/OrderConfirmation";
import HomePage from "../pages/HomePage";
import MainLayout from "../components/layout/MainLayout";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cart", element: <CartPage /> },
      { path: "order-confirmation", element: <OrderConfirmation /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];

export default routes;
