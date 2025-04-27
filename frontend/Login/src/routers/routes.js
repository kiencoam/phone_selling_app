import LoginPage from '../pages/LoginPage';
import CartPage from '../pages/CartPage';

const routes = [
  { path: '/', element: <LoginPage /> },
  { path: '/cart/', element: <CartPage /> },
];

export default routes;