import LoginPage from '../pages/LoginPage';
import PurchaseHistory from '../pages/PurchaseHistory';

const routes = [
  { path: '/', element: <LoginPage /> },
  { path: '/lich-su-mua-hang/', element: <PurchaseHistory /> },
];

export default routes;