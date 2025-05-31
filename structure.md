```
phone_selling_app/index.htmlhtml
├── frontend/
│   ├── User/
│   │   ├── public/                  # Tài nguyên tĩnh
│   │   │   ├── favicon.ico
│   │   │   ├── index.html
│   │   │   ├── manifest.json
│   │   │   └── assets/
│   │   │       ├── images/         # Hình ảnh tĩnh
│   │   │       └── fonts/          # Font chữ
│   │   │
│   │   ├── src/                    # Mã nguồn chính
│   │   │   ├── index.js            # Điểm vào ứng dụng
│   │   │   ├── App.js              # Component gốc
│   │   │   ├── routes.js           # Cấu hình định tuyến
│   │   │   │
│   │   │   ├── components/         # Components có thể tái sử dụng
│   │   │   │   ├── common/         # Components dùng chung
│   │   │   │   │   ├── Button/
│   │   │   │   │   │   ├── Button.jsx
│   │   │   │   │   │   ├── Button.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── Input/
│   │   │   │   │   │   ├── Input.jsx
│   │   │   │   │   │   ├── Input.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── Modal/
│   │   │   │   │   │   ├── Modal.jsx
│   │   │   │   │   │   ├── Modal.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── Breadcrumb/
│   │   │   │   │   │   ├── Breadcrumb.jsx
│   │   │   │   │   │   ├── Breadcrumb.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── Pagination/
│   │   │   │   │   │   ├── Pagination.jsx
│   │   │   │   │   │   ├── Pagination.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   └── Rating/
│   │   │   │   │       ├── Rating.jsx
│   │   │   │   │       ├── Rating.module.css
│   │   │   │   │       └── index.js
│   │   │   │   │
│   │   │   │   ├── layout/         # Components liên quan đến layout
│   │   │   │   │   ├── Header/
│   │   │   │   │   │   ├── Header.jsx
│   │   │   │   │   │   ├── Header.module.css
│   │   │   │   │   │   ├── Navigation.jsx
│   │   │   │   │   │   ├── SearchBar.jsx
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── Footer/
│   │   │   │   │   │   ├── Footer.jsx
│   │   │   │   │   │   ├── Footer.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── Sidebar/
│   │   │   │   │   │   ├── Sidebar.jsx
│   │   │   │   │   │   ├── Sidebar.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   └── MobileMenu/
│   │   │   │   │       ├── MobileMenu.jsx
│   │   │   │   │       ├── MobileMenu.module.css
│   │   │   │   │       └── index.js
│   │   │   │   │
│   │   │   │   ├── product/        # Components liên quan đến sản phẩm
│   │   │   │   │   ├── ProductCard/
│   │   │   │   │   │   ├── ProductCard.jsx
│   │   │   │   │   │   ├── ProductCard.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── ProductGrid/
│   │   │   │   │   │   ├── ProductGrid.jsx
│   │   │   │   │   │   ├── ProductGrid.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── ProductFilter/
│   │   │   │   │   │   ├── ProductFilter.jsx
│   │   │   │   │   │   ├── ProductFilter.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── ProductGallery/
│   │   │   │   │   │   ├── ProductGallery.jsx
│   │   │   │   │   │   ├── ProductGallery.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── ProductReviews/
│   │   │   │   │   │   ├── ProductReviews.jsx
│   │   │   │   │   │   ├── ProductReviews.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   └── ComparisonTable/
│   │   │   │   │       ├── ComparisonTable.jsx
│   │   │   │   │       ├── ComparisonTable.module.css
│   │   │   │   │       └── index.js
│   │   │   │   │
│   │   │   │   ├── cart/           # Components liên quan đến giỏ hàng
│   │   │   │   │   ├── CartItem/
│   │   │   │   │   │   ├── CartItem.jsx
│   │   │   │   │   │   ├── CartItem.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── CartSummary/
│   │   │   │   │   │   ├── CartSummary.jsx
│   │   │   │   │   │   ├── CartSummary.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   └── AddToCartButton/
│   │   │   │   │       ├── AddToCartButton.jsx
│   │   │   │   │       ├── AddToCartButton.module.css
│   │   │   │   │       └── index.js
│   │   │   │   │
│   │   │   │   ├── promotion/      # Components liên quan đến khuyến mãi
│   │   │   │   │   ├── PromotionBadge/
│   │   │   │   │   │   ├── PromotionBadge.jsx
│   │   │   │   │   │   ├── PromotionBadge.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── PromoCodeInput/
│   │   │   │   │   │   ├── PromoCodeInput.jsx
│   │   │   │   │   │   ├── PromoCodeInput.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── PromotionBanner/
│   │   │   │   │   │   ├── PromotionBanner.jsx
│   │   │   │   │   │   ├── PromotionBanner.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── PromotionCard/
│   │   │   │   │   │   ├── PromotionCard.jsx
│   │   │   │   │   │   ├── PromotionCard.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── PromotionCountdown/
│   │   │   │   │   │   ├── PromotionCountdown.jsx
│   │   │   │   │   │   ├── PromotionCountdown.module.css
│   │   │   │   │   │   └── index.js
│   │   │   │   │   └── BundleDeal/
│   │   │   │   │       ├── BundleDeal.jsx
│   │   │   │   │       ├── BundleDeal.module.css
│   │   │   │   │       └── index.js
│   │   │   │   │
│   │   │   │   └── user/           # Components liên quan đến người dùng
│   │   │   │       ├── UserProfile/
│   │   │   │       │   ├── UserProfile.jsx
│   │   │   │       │   ├── UserProfile.module.css
│   │   │   │       │   └── index.js
│   │   │   │       ├── LoginForm/
│   │   │   │       │   ├── LoginForm.jsx
│   │   │   │       │   ├── LoginForm.module.css
│   │   │   │       │   └── index.js
│   │   │   │       ├── RegisterForm/
│   │   │   │       │   ├── RegisterForm.jsx
│   │   │   │       │   ├── RegisterForm.module.css
│   │   │   │       │   └── index.js
│   │   │   │       └── AddressForm/
│   │   │   │           ├── AddressForm.jsx
│   │   │   │           ├── AddressForm.module.css
│   │   │   │           └── index.js
│   │   │   │
│   │   │   ├── pages/               # Các trang theo định tuyến
│   │   │   │   ├── Home/
│   │   │   │   │   ├── Home.jsx
│   │   │   │   │   ├── FeaturedProducts.jsx
│   │   │   │   │   ├── HeroBanner.jsx
│   │   │   │   │   └── index.js
│   │   │   │   │
│   │   │   │   ├── Category/
│   │   │   │   │   ├── Category.jsx
│   │   │   │   │   ├── FilterSidebar.jsx
│   │   │   │   │   ├── ProductList.jsx
│   │   │   │   │   └── index.js
│   │   │   │   │
│   │   │   │   ├── ProductDetail/
│   │   │   │   │   ├── ProductDetail.jsx
│   │   │   │   │   ├── ProductSpecifications.jsx
│   │   │   │   │   ├── RelatedProducts.jsx
│   │   │   │   │   └── index.js
│   │   │   │   │
│   │   │   │   ├── Cart/
│   │   │   │   │   ├── Cart.jsx
│   │   │   │   │   └── index.js
│   │   │   │   │
│   │   │   │   ├── Checkout/
│   │   │   │   │   ├── Checkout.jsx
│   │   │   │   │   ├── ShippingForm.jsx
│   │   │   │   │   ├── PaymentForm.jsx
│   │   │   │   │   ├── OrderSummary.jsx
│   │   │   │   │   └── index.js
│   │   │   │   │
│   │   │   │   ├── Account/
│   │   │   │   │   ├── Dashboard.jsx
│   │   │   │   │   ├── Orders.jsx
│   │   │   │   │   ├── Wishlist.jsx
│   │   │   │   │   ├── Profile.jsx
│   │   │   │   │   └── index.js
│   │   │   │   │
│   │   │   │   ├── Comparison/
│   │   │   │   │   ├── Comparison.jsx
│   │   │   │   │   └── index.js
│   │   │   │   │
│   │   │   │   ├── Search/
│   │   │   │   │   ├── SearchResults.jsx
│   │   │   │   │   └── index.js
│   │   │   │   │
│   │   │   │   ├── Phone/
│   │   │   │   │   ├── PhoneHome.jsx
│   │   │   │   │   ├── PhoneBrand.jsx
│   │   │   │   │   ├── PhoneComparison.jsx
│   │   │   │   │   └── components/
│   │   │   │   │       ├── PhoneFilter.jsx
│   │   │   │   │       └── PhoneFeatures.jsx
│   │   │   │   │
│   │   │   │   ├── Laptop/
│   │   │   │   │   ├── LaptopHome.jsx
│   │   │   │   │   ├── LaptopBrand.jsx
│   │   │   │   │   ├── LaptopComparison.jsx
│   │   │   │   │   └── components/
│   │   │   │   │       ├── LaptopFilter.jsx
│   │   │   │   │       └── LaptopSpecs.jsx
│   │   │   │   │
│   │   │   │   ├── Accessory/
│   │   │   │   │   ├── AccessoryHome.jsx
│   │   │   │   │   ├── MobileAccessory.jsx
│   │   │   │   │   ├── AudioAccessory.jsx
│   │   │   │   │   ├── CameraAccessory.jsx
│   │   │   │   │   └── LaptopAccessory.jsx
│   │   │   │   │
│   │   │   │   ├── Promotion/         # Trang khuyến mãi cho người dùng
│   │   │   │   │   ├── AllPromotions.jsx   # Danh sách tất cả khuyến mãi
│   │   │   │   │   ├── PromotionDetail.jsx # Chi tiết khuyến mãi
│   │   │   │   │   ├── FlashSale.jsx       # Trang flash sale
│   │   │   │   │   ├── Clearance.jsx       # Trang thanh lý
│   │   │   │   │   ├── BundleOffers.jsx    # Trang ưu đãi combo
│   │   │   │   │   └── index.js
│   │   │   │   │
│   │   │   │   └── Admin/
│   │   │   │       ├── Promotion/           # Quản lý khuyến mãi (Admin)
│   │   │   │       │   ├── PromotionDashboard.jsx  # Tổng quan khuyến mãi
│   │   │   │       │   ├── PromotionList.jsx       # Danh sách khuyến mãi
│   │   │   │       │   ├── PromotionForm.jsx       # Form tạo/sửa khuyến mãi
│   │   │   │       │   ├── PromotionStats.jsx      # Thống kê khuyến mãi
│   │   │   │       │   └── PromotionCalendar.jsx   # Lịch khuyến mãi
│   │   │   │
│   │   │   ├── layouts/             # Bố cục chung của trang
│   │   │   │   ├── MainLayout.jsx   # Layout chính với Header và Footer
│   │   │   │   ├── AccountLayout.jsx # Layout cho các trang tài khoản
│   │   │   │   ├── CheckoutLayout.jsx # Layout cho quy trình thanh toán
│   │   │   │   └── AdminLayout.jsx  # Layout cho trang admin
│   │   │   │
│   │   │   ├── hooks/               # Custom React hooks
│   │   │   │   ├── useAuth.js       # Hook xử lý xác thực
│   │   │   │   ├── useCart.js       # Hook xử lý giỏ hàng
│   │   │   │   ├── useProducts.js   # Hook lấy dữ liệu sản phẩm
│   │   │   │   ├── useLocalStorage.js # Hook lưu trữ local
│   │   │   │   ├── useWindowSize.js # Hook kiểm tra kích thước màn hình
│   │   │   │   ├── useFetch.js      # Hook gọi API chung
│   │   │   │   └── usePromotion.js  # Hook xử lý khuyến mãi
│   │   │   │
│   │   │   ├── contexts/            # Context API providers
│   │   │   │   ├── AuthContext.jsx  # Quản lý trạng thái đăng nhập
│   │   │   │   ├── CartContext.jsx  # Quản lý giỏ hàng
│   │   │   │   ├── WishlistContext.jsx # Quản lý danh sách yêu thích
│   │   │   │   ├── FilterContext.jsx # Quản lý bộ lọc sản phẩm
│   │   │   │   ├── ThemeContext.jsx # Quản lý theme (sáng/tối)
│   │   │   │   └── PromotionContext.jsx # Quản lý trạng thái khuyến mãi
│   │   │   │
│   │   │   ├── services/            # Gọi API và xử lý dữ liệu
│   │   │   │   ├── api.js           # Cấu hình Axios và interceptors
│   │   │   │   ├── auth.service.js  # Xử lý đăng nhập/đăng ký
│   │   │   │   ├── product.service.js # API liên quan đến sản phẩm
│   │   │   │   ├── cart.service.js  # API giỏ hàng
│   │   │   │   ├── order.service.js # API đơn hàng
│   │   │   │   ├── user.service.js  # API người dùng
│   │   │   │   └── promotion.service.js # API khuyến mãi
│   │   │   │
│   │   │   ├── utils/               # Tiện ích và hàm helper
│   │   │   │   ├── formatters.js    # Định dạng giá, ngày tháng
│   │   │   │   ├── validators.js    # Kiểm tra dữ liệu form
│   │   │   │   ├── storage.js       # Xử lý local storage
│   │   │   │   ├── helpers.js       # Các hàm trợ giúp khác
│   │   │   │   ├── constants.js     # Các hằng số
│   │   │   │   └── promotionCalculator.js # Tính toán giá sau khuyến mãi
│   │   │   │
│   │   │   ├── constants/           # Các giá trị không đổi
│   │   │   │   ├── routes.js
│   │   │   │   ├── api.js
│   │   │   │   ├── ui.js
│   │   │   │   └── promotionTypes.js # Các loại khuyến mãi
│   │   │   │
│   │   │   ├── assets/              # Tài nguyên trong ứng dụng
│   │   │   │   ├── images/
│   │   │   │   ├── icons/
│   │   │   │   └── styles/
│   │   │   │
│   │   │   └── styles/              # Global styles
│   │   │       ├── global.css
│   │   │       ├── variables.css
│   │   │       └── themes.css
│   │   │
│   │   ├── package.json
│   │   ├── README.md
│   │   └── .env                     # Biến môi trường
│   │
│   └── Admin/                       # Trang quản trị viên (có thể tách riêng)
│       ├── src/
│       │   └── pages/
│       │       └── Promotion/       # Quản lý khuyến mãi
│       │           ├── PromotionList/
│       │           │   ├── PromotionList.jsx
│       │           │   └── index.js
│       │           ├── PromotionCreate/
│       │           │   ├── PromotionCreate.jsx
│       │           │   ├── PromotionForm.jsx
│       │           │   └── index.js
│       │           ├── PromotionEdit/
│       │           │   ├── PromotionEdit.jsx
│       │           │   └── index.js
│       │           ├── PromotionRules/
│       │           │   ├── PromotionRules.jsx
│       │           │   ├── RuleBuilder.jsx
│       │           │   └── index.js
│       │           ├── PromotionAnalytics/
│       │           │   ├── PromotionAnalytics.jsx
│       │           │   ├── PromotionChart.jsx
│       │           │   └── index.js
│       │           └── components/
│       │               ├── PromotionFilterAdmin.jsx
│       │               ├── PromotionScheduler.jsx
│       │               ├── ProductSelector.jsx
│       │               └── TargetCustomerSelector.jsx
│       │
│       └── package.json
│
└── backend/
    └── src/
        ├── controllers/
        │   └── promotion.controller.js  # Xử lý logic khuyến mãi
        │
        ├── models/
        │   └── promotion.model.js       # Mô hình dữ liệu khuyến mãi
        │
        ├── routes/
        │   └── promotion.routes.js      # Định tuyến API khuyến mãi
        │
        └── services/
            └── promotion.service.js     # Xử lý nghiệp vụ khuyến mãi
```