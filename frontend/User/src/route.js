import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
//import AccountLayout from './layouts/AccountLayout';
//import CheckoutLayout from './layouts/CheckoutLayout';

// Lazy loading các trang để cải thiện hiệu suất
const Home = lazy(() => import('./pages/Home'));
const Category = lazy(() => import('./pages/Category'));
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'));
//const Cart = lazy(() => import('./pages/Cart'));
//const Checkout = lazy(() => import('./pages/Checkout'));
//const Account = lazy(() => import('./pages/Account/Dashboard'));
//const Orders = lazy(() => import('./pages/Account/Orders'));
//const Wishlist = lazy(() => import('./pages/Account/Wishlist'));
const Profile = lazy(() => import('./pages/Account/Profile'));
const Search = lazy(() => import('./pages/Search'));
const Comparison = lazy(() => import('./pages/Comparison'));

// Các trang chuyên biệt cho từng loại sản phẩm
const PhoneHome = lazy(() => import('./pages/Phone/PhoneHome'));
const PhoneBrand = lazy(() => import('./pages/Phone/PhoneBrand'));
const LaptopHome = lazy(() => import('./pages/Laptop/LaptopHome'));
const LaptopBrand = lazy(() => import('./pages/Laptop/LaptopBrand'));

// Các trang khuyến mãi
const AllPromotions = lazy(() => import('./pages/Promotion/AllPromotions'));
const PromotionDetail = lazy(() => import('./pages/Promotion/PromotionDetail'));
const FlashSale = lazy(() => import('./pages/Promotion/FlashSale'));

// Fallback component khi đang tải
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'category/:categorySlug',
        element: (
          <Suspense fallback={<Loader />}>
            <Category />
          </Suspense>
        ),
      },
      {
        path: 'product/:productSlug',
        element: (
          <Suspense fallback={<Loader />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: 'search',
        element: (
          <Suspense fallback={<Loader />}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: 'comparison',
        element: (
          <Suspense fallback={<Loader />}>
            <Comparison />
          </Suspense>
        ),
      },
      {
        path: 'phone',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <PhoneHome />
              </Suspense>
            ),
          },
          {
            path: ':brand',
            element: (
              <Suspense fallback={<Loader />}>
                <PhoneBrand />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'laptop',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <LaptopHome />
              </Suspense>
            ),
          },
          {
            path: ':brand',
            element: (
              <Suspense fallback={<Loader />}>
                <LaptopBrand />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'promotion',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <AllPromotions />
              </Suspense>
            ),
          },
          {
            path: ':promotionId',
            element: (
              <Suspense fallback={<Loader />}>
                <PromotionDetail />
              </Suspense>
            ),
          },
          {
            path: 'flash-sale',
            element: (
              <Suspense fallback={<Loader />}>
                <FlashSale />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/checkout',
    element: <CheckoutLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Checkout />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/account',
    element: <AccountLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Account />
          </Suspense>
        ),
      },
      {
        path: 'orders',
        element: (
          <Suspense fallback={<Loader />}>
            <Orders />
          </Suspense>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <Suspense fallback={<Loader />}>
            <Wishlist />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<Loader />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;