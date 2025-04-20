import LoginPage from '../pages/LoginPage';
import ProductDetail from '../pages/ProductDetail';
import PurchaseHistory from '../pages/PurchaseHistory';

const routes = [
  { path: '/', element: <LoginPage /> },
  { path: '/lich-su-mua-hang/', element: <PurchaseHistory /> },
  { path: '/dtdd/', element: <ProductDetail /> },
];

export default routes;