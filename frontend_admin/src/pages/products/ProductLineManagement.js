import React, { useState, useEffect, useRef } from 'react';
import { Container, Card, Table, Button, Form, Modal, Spinner, Alert, InputGroup, Image } from 'react-bootstrap';
import { productLineService } from '../../services/productLineService';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { brandService } from '../../services/brandService';

const ProductLineManagement = () => {
  // State quản lý danh sách dòng sản phẩm
  const [productLines, setProductLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State cho tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [isSearchResult, setIsSearchResult] = useState(false);
  
  // State cho modal thêm/sửa dòng sản phẩm
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');
  
  // State cho form thêm/sửa dòng sản phẩm
  const [editingProductLine, setEditingProductLine] = useState({ 
    id: null, 
    name: '', 
    code: '', 
    brandId: '', 
    categoryId: '' 
  });
  
  // State danh sách danh mục và thương hiệu
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  
  // State cho modal xác nhận xóa
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingProductLine, setDeletingProductLine] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  // State cho thông báo thao tác
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  
  // State cho modal danh sách sản phẩm
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [selectedProductLine, setSelectedProductLine] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState('');
  
  // State cho modal thêm/sửa sản phẩm
  const [showProductModal, setShowProductModal] = useState(false);
  const [productModalTitle, setProductModalTitle] = useState('');
  const [productModalLoading, setProductModalLoading] = useState(false);
  const [productModalError, setProductModalError] = useState('');
  const [editingProduct, setEditingProduct] = useState({
    id: null,
    name: '',
    code: '',
    description: '',
    basePrice: '',
    image: null
  });
  
  // State cho xử lý ảnh
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);
  
  // State cho modal xác nhận xóa sản phẩm
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deleteProductLoading, setDeleteProductLoading] = useState(false);
  
  // State cho modal quản lý thuộc tính sản phẩm
  const [showAttributesModal, setShowAttributesModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productAttributes, setProductAttributes] = useState([]);
  const [attributesLoading, setAttributesLoading] = useState(false);
  const [attributesError, setAttributesError] = useState('');
  
  // State cho modal chỉnh sửa thuộc tính
  const [showEditAttributeModal, setShowEditAttributeModal] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState({ id: null, value: '', attribute: null });
  const [attributeModalLoading, setAttributeModalLoading] = useState(false);
  const [attributeModalError, setAttributeModalError] = useState('');
  
  // Lấy danh sách dòng sản phẩm khi component được mount
  useEffect(() => {
    fetchProductLines();
    fetchOptions();
  }, []);

  // Hàm lấy danh sách dòng sản phẩm từ API
  const fetchProductLines = async () => {
    try {
      setLoading(true);
      setError('');
      setIsSearchResult(false);
      
      console.log('[PRODUCT-LINE MANAGEMENT] Đang lấy danh sách dòng sản phẩm');
      const response = await productLineService.getProductLines();
      
      if (response && response.data && response.data.content) {
        console.log('[PRODUCT-LINE MANAGEMENT] Đã lấy danh sách dòng sản phẩm:', response.data.content);
        // Lọc bỏ các phần tử không hợp lệ
        const validProductLines = response.data.content.filter(item => item && item.id);
        setProductLines(validProductLines);
      } else {
        console.error('[PRODUCT-LINE MANAGEMENT] Phản hồi API không hợp lệ:', response);
        setError('Không thể lấy danh sách dòng sản phẩm');
      }
    } catch (err) {
      console.error('[PRODUCT-LINE MANAGEMENT] Lỗi khi lấy danh sách dòng sản phẩm:', err);
      setError('Đã xảy ra lỗi khi lấy danh sách dòng sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  // Hàm lấy danh sách danh mục và thương hiệu
  const fetchOptions = async () => {
    try {
      setLoadingOptions(true);
      
      // Lấy danh sách danh mục
      const categoriesResponse = await categoryService.getCategories();
      if (categoriesResponse && categoriesResponse.data) {
        setCategories(categoriesResponse.data || []);
      }
      
      // Lấy danh sách thương hiệu
      const brandsResponse = await brandService.getBrands();
      if (brandsResponse && brandsResponse.data) {
        setBrands(brandsResponse.data || []);
      }
    } catch (err) {
      console.error('[PRODUCT-LINE MANAGEMENT] Lỗi khi lấy danh sách danh mục và thương hiệu:', err);
    } finally {
      setLoadingOptions(false);
    }
  };

  // Hàm xử lý xóa từ khóa tìm kiếm và hiển thị lại toàn bộ danh sách
  const clearSearch = () => {
    setSearchTerm('');
    fetchProductLines();
  };

  // Hàm mở modal thêm dòng sản phẩm mới
  const handleAddProductLine = () => {
    setModalTitle('Thêm dòng sản phẩm mới');
    setEditingProductLine({ id: null, name: '', code: '', brandId: '', categoryId: '' });
    setModalError('');
    setShowModal(true);
  };

  // Hàm mở modal sửa dòng sản phẩm
  const handleEditProductLine = (productLine) => {
    if (!productLine || !productLine.id) {
      console.error('[PRODUCT-LINE MANAGEMENT] Dòng sản phẩm không hợp lệ:', productLine);
      showNotification('danger', 'Không thể chỉnh sửa dòng sản phẩm này');
      return;
    }

    setModalTitle('Cập nhật dòng sản phẩm');
    setEditingProductLine({ 
      id: productLine.id, 
      name: productLine.name || '', 
      code: productLine.code || '', 
      brandId: productLine.brand?.id || '', 
      categoryId: productLine.category?.id || '' 
    });
    setModalError('');
    setShowModal(true);
  };

  // Hàm lưu dòng sản phẩm (thêm mới hoặc cập nhật)
  const handleSaveProductLine = async () => {
    // Kiểm tra các trường bắt buộc
    if (!editingProductLine.name.trim()) {
      setModalError('Vui lòng nhập tên dòng sản phẩm');
      return;
    }
    
    if (!editingProductLine.brandId) {
      setModalError('Vui lòng chọn thương hiệu');
      return;
    }
    
    if (!editingProductLine.categoryId) {
      setModalError('Vui lòng chọn danh mục sản phẩm');
      return;
    }

    try {
      setModalLoading(true);
      setModalError('');

      const productLineData = { ...editingProductLine };
      // Đảm bảo brandId và categoryId là số
      productLineData.brandId = Number(productLineData.brandId);
      productLineData.categoryId = Number(productLineData.categoryId);

      if (editingProductLine.id) {
        // Cập nhật dòng sản phẩm
        console.log('[PRODUCT-LINE MANAGEMENT] Đang cập nhật dòng sản phẩm:', productLineData);
        const response = await productLineService.updateProductLine(productLineData);
        
        if (response && response.data) {
          // Cập nhật danh sách
          setProductLines(prevProductLines => 
            prevProductLines.map(pl => 
              pl.id === editingProductLine.id ? response.data : pl
            )
          );
          
          // Hiển thị thông báo
          showNotification('success', 'Cập nhật dòng sản phẩm thành công');
        }
      } else {
        // Thêm dòng sản phẩm mới
        console.log('[PRODUCT-LINE MANAGEMENT] Đang thêm dòng sản phẩm mới:', productLineData);
        const response = await productLineService.createProductLine(productLineData);
        
        if (response && response.data) {
          // Cập nhật danh sách
          setProductLines(prevProductLines => [...prevProductLines, response.data]);
          
          // Hiển thị thông báo
          showNotification('success', 'Thêm dòng sản phẩm thành công');
        }
      }

      // Đóng modal
      setShowModal(false);
    } catch (err) {
      console.error('[PRODUCT-LINE MANAGEMENT] Lỗi khi lưu dòng sản phẩm:', err);
      setModalError('Đã xảy ra lỗi khi lưu dòng sản phẩm');
    } finally {
      setModalLoading(false);
    }
  };

  // Hàm mở modal xác nhận xóa dòng sản phẩm
  const handleDeleteConfirm = (productLine) => {
    if (!productLine || !productLine.id) {
      console.error('[PRODUCT-LINE MANAGEMENT] Dòng sản phẩm không hợp lệ:', productLine);
      showNotification('danger', 'Không thể xóa dòng sản phẩm này');
      return;
    }
    
    setDeletingProductLine(productLine);
    setShowDeleteModal(true);
  };

  // Hàm xóa dòng sản phẩm
  const handleDeleteProductLine = async () => {
    if (!deletingProductLine) return;

    try {
      setDeleteLoading(true);
      
      console.log('[PRODUCT-LINE MANAGEMENT] Đang xóa dòng sản phẩm:', deletingProductLine);
      await productLineService.deleteProductLine(deletingProductLine.id);
      
      // Cập nhật danh sách
      setProductLines(prevProductLines => 
        prevProductLines.filter(pl => pl.id !== deletingProductLine.id)
      );
      
      // Hiển thị thông báo
      showNotification('success', 'Xóa dòng sản phẩm thành công');
      
      // Đóng modal
      setShowDeleteModal(false);
    } catch (err) {
      console.error('[PRODUCT-LINE MANAGEMENT] Lỗi khi xóa dòng sản phẩm:', err);
      showNotification('danger', 'Đã xảy ra lỗi khi xóa dòng sản phẩm');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Hàm hiển thị sản phẩm của dòng sản phẩm
  const handleViewProducts = async (productLine) => {
    if (!productLine || !productLine.id) {
      console.error('[PRODUCT-LINE MANAGEMENT] Dòng sản phẩm không hợp lệ:', productLine);
      showNotification('danger', 'Không thể xem sản phẩm của dòng sản phẩm này');
      return;
    }

    setSelectedProductLine(productLine);
    setProductsLoading(true);
    setProductsError('');
    setProducts([]);
    setShowProductsModal(true);
    
    try {
      console.log('[PRODUCT-LINE MANAGEMENT] Đang lấy danh sách sản phẩm của dòng sản phẩm:', productLine.id);
      const response = await productLineService.getProductsByProductLineId(productLine.id);
      
      if (response && response.data) {
        console.log('[PRODUCT-LINE MANAGEMENT] Đã lấy danh sách sản phẩm:', response.data);
        // Lọc bỏ các phần tử không hợp lệ
        const validProducts = Array.isArray(response.data) ? response.data.filter(item => item && item.id) : [];
        setProducts(validProducts);
      } else {
        console.error('[PRODUCT-LINE MANAGEMENT] Phản hồi API không hợp lệ:', response);
        setProductsError('Không thể lấy danh sách sản phẩm');
      }
    } catch (err) {
      console.error('[PRODUCT-LINE MANAGEMENT] Lỗi khi lấy danh sách sản phẩm:', err);
      setProductsError('Đã xảy ra lỗi khi lấy danh sách sản phẩm');
    } finally {
      setProductsLoading(false);
    }
  };

  // Hàm hiển thị thông báo
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 3000);
  };
  
  // Hàm chuyển đổi file sang base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
  // Hàm xử lý khi chọn file ảnh
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setEditingProduct({
          ...editingProduct,
          image: {
            base64: base64.split(',')[1], // Loại bỏ phần đầu của base64 string
            isPrimary: true
          }
        });
        setImagePreview(base64);
      } catch (error) {
        console.error('[PRODUCT MANAGEMENT] Lỗi khi chuyển đổi ảnh sang base64:', error);
        setProductModalError('Không thể tải ảnh. Vui lòng thử lại.');
      }
    }
  };
  
  // Hàm mở modal thêm sản phẩm mới
  const handleAddProduct = () => {
    setProductModalTitle('Thêm sản phẩm mới');
    setEditingProduct({
      id: null,
      name: '',
      code: '',
      description: '',
      basePrice: '',
      productLineId: selectedProductLine.id,
      image: null
    });
    setImagePreview('');
    setProductModalError('');
    setShowProductModal(true);
  };
  
  // Hàm mở modal sửa sản phẩm
  const handleEditProduct = (product) => {
    setProductModalTitle('Cập nhật sản phẩm');
    setEditingProduct({
      id: product.id,
      name: product.name || '',
      code: product.code || '',
      description: product.description || '',
      basePrice: product.basePrice || '',
      image: product.image
    });
    
    // Hiển thị ảnh nếu có
    if (product.image && product.image.base64) {
      setImagePreview(`data:image/jpeg;base64,${product.image.base64}`);
    } else {
      setImagePreview('');
    }
    
    setProductModalError('');
    setShowProductModal(true);
  };
  
  // Hàm lưu sản phẩm (thêm mới hoặc cập nhật)
  const handleSaveProduct = async () => {
    // Kiểm tra các trường bắt buộc
    if (!editingProduct.name.trim()) {
      setProductModalError('Vui lòng nhập tên sản phẩm');
      return;
    }
    
    if (!editingProduct.basePrice) {
      setProductModalError('Vui lòng nhập giá cơ bản');
      return;
    }
    
    try {
      setProductModalLoading(true);
      setProductModalError('');
      
      // Chuẩn bị dữ liệu
      const productData = {
        ...editingProduct,
        basePrice: parseInt(editingProduct.basePrice, 10)
      };
      
      // Nếu đang thêm mới, thêm productLineId vào dữ liệu
      if (!productData.id && selectedProductLine) {
        productData.productLineId = selectedProductLine.id;
      }
      
      if (editingProduct.id) {
        // Cập nhật sản phẩm
        console.log('[PRODUCT MANAGEMENT] Đang cập nhật sản phẩm:', productData);
        const response = await productService.updateProduct(productData);
        
        if (response && response.data) {
          // Cập nhật danh sách
          setProducts(prevProducts => 
            prevProducts.map(p => 
              p.id === editingProduct.id ? response.data : p
            )
          );
          
          // Hiển thị thông báo
          showNotification('success', 'Cập nhật sản phẩm thành công');
        }
      } else {
        // Thêm sản phẩm mới
        console.log('[PRODUCT MANAGEMENT] Đang thêm sản phẩm mới:', productData);
        const response = await productService.createProduct(productData);
        
        if (response && response.data) {
          // Cập nhật danh sách
          setProducts(prevProducts => [...prevProducts, response.data]);
          
          // Hiển thị thông báo
          showNotification('success', 'Thêm sản phẩm thành công');
        }
      }
      
      // Đóng modal
      setShowProductModal(false);
      
      // Refresh lại danh sách sản phẩm
      if (selectedProductLine) {
        handleViewProducts(selectedProductLine);
      }
    } catch (err) {
      console.error('[PRODUCT MANAGEMENT] Lỗi khi lưu sản phẩm:', err);
      setProductModalError('Đã xảy ra lỗi khi lưu sản phẩm');
    } finally {
      setProductModalLoading(false);
    }
  };

  // Hàm mở modal xác nhận xóa sản phẩm
  const handleDeleteProductConfirm = (product) => {
    if (!product || !product.id) {
      console.error('[PRODUCT MANAGEMENT] Sản phẩm không hợp lệ:', product);
      showNotification('danger', 'Không thể xóa sản phẩm này');
      return;
    }
    
    setDeletingProduct(product);
    setShowDeleteProductModal(true);
  };
  
  // Hàm xóa sản phẩm
  const handleDeleteProduct = async () => {
    if (!deletingProduct) return;
    
    try {
      setDeleteProductLoading(true);
      
      console.log('[PRODUCT MANAGEMENT] Đang xóa sản phẩm:', deletingProduct);
      await productService.deleteProduct(deletingProduct.id);
      
      // Cập nhật danh sách
      setProducts(prevProducts => 
        prevProducts.filter(p => p.id !== deletingProduct.id)
      );
      
      // Hiển thị thông báo
      showNotification('success', 'Xóa sản phẩm thành công');
      
      // Đóng modal
      setShowDeleteProductModal(false);
    } catch (err) {
      console.error('[PRODUCT MANAGEMENT] Lỗi khi xóa sản phẩm:', err);
      showNotification('danger', 'Đã xảy ra lỗi khi xóa sản phẩm');
    } finally {
      setDeleteProductLoading(false);
    }
  };
  
  // Hàm xem thuộc tính sản phẩm
  const handleViewAttributes = async (product) => {
    if (!product || !product.id) {
      console.error('[PRODUCT MANAGEMENT] Sản phẩm không hợp lệ:', product);
      showNotification('danger', 'Không thể xem thuộc tính của sản phẩm này');
      return;
    }
    
    setSelectedProduct(product);
    setAttributesLoading(true);
    setAttributesError('');
    setProductAttributes([]);
    setShowAttributesModal(true);
    
    try {
      console.log('[PRODUCT MANAGEMENT] Đang lấy thông tin chi tiết sản phẩm:', product.id);
      const response = await productService.getProductById(product.id);
      
      if (response && response.data && response.data.attributes) {
        console.log('[PRODUCT MANAGEMENT] Đã lấy thuộc tính sản phẩm:', response.data.attributes);
        // Lọc bỏ các phần tử không hợp lệ
        const validAttributes = Array.isArray(response.data.attributes) 
          ? response.data.attributes.filter(item => item && item.id) 
          : [];
        setProductAttributes(validAttributes);
        
        // Cập nhật thông tin sản phẩm với đầy đủ chi tiết
        setSelectedProduct(response.data);
      } else {
        console.error('[PRODUCT MANAGEMENT] Phản hồi API không hợp lệ:', response);
        setAttributesError('Không thể lấy thông tin thuộc tính sản phẩm');
      }
    } catch (err) {
      console.error('[PRODUCT MANAGEMENT] Lỗi khi lấy thuộc tính sản phẩm:', err);
      setAttributesError('Đã xảy ra lỗi khi lấy thông tin thuộc tính sản phẩm');
    } finally {
      setAttributesLoading(false);
    }
  };
  
  // Hàm mở modal chỉnh sửa thuộc tính
  const handleEditAttribute = (attribute) => {
    if (!attribute || !attribute.id) {
      console.error('[PRODUCT MANAGEMENT] Thuộc tính không hợp lệ:', attribute);
      showNotification('danger', 'Không thể chỉnh sửa thuộc tính này');
      return;
    }
    
    setEditingAttribute({
      id: attribute.id,
      value: attribute.value || '',
      attribute: attribute.attribute
    });
    
    setAttributeModalError('');
    setShowEditAttributeModal(true);
  };
  
  // Hàm lưu chỉnh sửa thuộc tính
  const handleSaveAttribute = async () => {
    if (!editingAttribute.id) {
      setAttributeModalError('Thuộc tính không hợp lệ');
      return;
    }
    
    if (!editingAttribute.value.trim()) {
      setAttributeModalError('Vui lòng nhập giá trị thuộc tính');
      return;
    }
    
    try {
      setAttributeModalLoading(true);
      setAttributeModalError('');
      
      console.log('[PRODUCT MANAGEMENT] Đang cập nhật thuộc tính:', editingAttribute);
      const response = await productService.updateProductAttribute({
        id: editingAttribute.id,
        value: editingAttribute.value
      });
      
      if (response && response.data) {
        // Cập nhật danh sách thuộc tính
        setProductAttributes(prevAttributes => 
          prevAttributes.map(attr => 
            attr.id === editingAttribute.id ? response.data : attr
          )
        );
        
        // Hiển thị thông báo
        showNotification('success', 'Cập nhật thuộc tính thành công');
        
        // Đóng modal
        setShowEditAttributeModal(false);
      } else {
        console.error('[PRODUCT MANAGEMENT] Phản hồi API không hợp lệ:', response);
        setAttributeModalError('Không thể cập nhật thuộc tính');
      }
    } catch (err) {
      console.error('[PRODUCT MANAGEMENT] Lỗi khi cập nhật thuộc tính:', err);
      setAttributeModalError('Đã xảy ra lỗi khi cập nhật thuộc tính');
    } finally {
      setAttributeModalLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Quản lý dòng sản phẩm</h2>

      {/* Hiển thị thông báo */}
      {notification.show && (
        <Alert variant={notification.type} onClose={() => setNotification({ show: false, type: '', message: '' })} dismissible>
          {notification.message}
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center card-header-tgdd">
          <span>
            {isSearchResult 
              ? `Kết quả tìm kiếm: "${searchTerm}" (${productLines.length} dòng sản phẩm)` 
              : 'Danh sách dòng sản phẩm'
            }
          </span>
          <div>
            {isSearchResult && (
              <Button variant="outline-light" size="sm" className="me-2" onClick={clearSearch}>
                <i className="bi bi-arrow-left me-1"></i> Quay lại
              </Button>
            )}
            <Button variant="light" size="sm" onClick={handleAddProductLine}>
              <i className="bi bi-plus-circle me-1"></i> Thêm dòng sản phẩm
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Đang tải danh sách dòng sản phẩm...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : productLines.length === 0 ? (
            <div className="text-center py-4">
              {isSearchResult ? (
                <>
                  <p className="text-muted">Không tìm thấy dòng sản phẩm phù hợp với từ khóa "{searchTerm}"</p>
                  <Button variant="outline-secondary" onClick={clearSearch}>
                    <i className="bi bi-arrow-left me-1"></i> Quay lại danh sách
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-muted">Chưa có dòng sản phẩm nào</p>
                  <Button variant="primary" onClick={handleAddProductLine}>
                    <i className="bi bi-plus-circle me-1"></i> Thêm dòng sản phẩm mới
                  </Button>
                </>
              )}
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>#</th>
                  <th style={{ width: '25%' }}>Tên dòng sản phẩm</th>
                  <th style={{ width: '15%' }}>Mã dòng sản phẩm</th>
                  <th style={{ width: '20%' }}>Danh mục</th>
                  <th style={{ width: '20%' }}>Thương hiệu</th>
                  <th style={{ width: '15%' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {productLines.map((productLine, index) => (
                  <tr key={productLine.id}>
                    <td>{index + 1}</td>
                    <td>{productLine.name || ''}</td>
                    <td>{productLine.code || ''}</td>
                    <td>{productLine.category?.name || 'Không xác định'}</td>
                    <td>{productLine.brand?.name || 'Không xác định'}</td>
                    <td>
                      <Button variant="info" size="sm" className="me-2" onClick={() => handleViewProducts(productLine)}>
                        <i className="bi bi-box"></i>
                      </Button>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditProductLine(productLine)}>
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteConfirm(productLine)}>
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Modal thêm/sửa dòng sản phẩm */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalError && <Alert variant="danger">{modalError}</Alert>}
          <Form>
            <Form.Group className="mb-3" controlId="productLineName">
              <Form.Label>Tên dòng sản phẩm</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên dòng sản phẩm"
                value={editingProductLine.name}
                onChange={(e) => setEditingProductLine({ ...editingProductLine, name: e.target.value })}
                required
              />
            </Form.Group>
            
            {!editingProductLine.id && (
              <Form.Group className="mb-3" controlId="productLineCode">
                <Form.Label>Mã dòng sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập mã dòng sản phẩm"
                  value={editingProductLine.code}
                  onChange={(e) => setEditingProductLine({ ...editingProductLine, code: e.target.value })}
                  required
                />
              </Form.Group>
            )}
            
            <Form.Group className="mb-3" controlId="productLineCategory">
              <Form.Label>Danh mục sản phẩm</Form.Label>
              <Form.Select
                value={editingProductLine.categoryId}
                onChange={(e) => setEditingProductLine({ ...editingProductLine, categoryId: e.target.value })}
                required
              >
                <option value="">-- Chọn danh mục --</option>
                {categories && categories.filter(Boolean).map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="productLineBrand">
              <Form.Label>Thương hiệu</Form.Label>
              <Form.Select
                value={editingProductLine.brandId}
                onChange={(e) => setEditingProductLine({ ...editingProductLine, brandId: e.target.value })}
                required
              >
                <option value="">-- Chọn thương hiệu --</option>
                {brands && brands.filter(Boolean).map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveProductLine} disabled={modalLoading}>
            {modalLoading ? <Spinner animation="border" size="sm" /> : 'Lưu'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal xác nhận xóa dòng sản phẩm */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa dòng sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa dòng sản phẩm <strong>{deletingProductLine?.name}</strong>?
          <p className="text-danger mt-2">Lưu ý: Hành động này không thể hoàn tác.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDeleteProductLine} disabled={deleteLoading}>
            {deleteLoading ? <Spinner animation="border" size="sm" /> : 'Xóa'}
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Modal xem sản phẩm của dòng sản phẩm */}
      <Modal show={showProductsModal} onHide={() => setShowProductsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Sản phẩm thuộc dòng: {selectedProductLine?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsError && <Alert variant="danger">{productsError}</Alert>}
          
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" size="sm" onClick={handleAddProduct}>
              <i className="bi bi-plus-circle me-1"></i> Thêm sản phẩm mới
            </Button>
          </div>
          
          {productsLoading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Đang tải danh sách sản phẩm...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">Chưa có sản phẩm nào thuộc dòng sản phẩm này</p>
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>ID</th>
                  <th style={{ width: '30%' }}>Tên sản phẩm</th>
                  <th style={{ width: '15%' }}>Hình ảnh</th>
                  <th style={{ width: '15%' }}>Giá</th>
                  <th style={{ width: '20%' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name || 'Không xác định'}</td>
                    <td className="text-center">
                      {product.image && product.image.base64 ? (
                        <Image 
                          src={`data:image/jpeg;base64,${product.image.base64}`} 
                          alt={product.name} 
                          style={{ height: '50px', maxWidth: '100%' }} 
                          thumbnail 
                        />
                      ) : (
                        <span className="text-muted">Không có ảnh</span>
                      )}
                    </td>
                    <td>{product.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price) : 'Chưa cập nhật'}</td>
                    <td>
                      <Button variant="info" size="sm" className="me-2" onClick={() => handleViewAttributes(product)}>
                        <i className="bi bi-info-circle"></i>
                      </Button>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditProduct(product)}>
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteProductConfirm(product)}>
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProductsModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Modal thêm/sửa sản phẩm */}
      <Modal show={showProductModal} onHide={() => setShowProductModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{productModalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productModalError && <Alert variant="danger">{productModalError}</Alert>}
          <Form>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên sản phẩm"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="productCode">
              <Form.Label>Mã sản phẩm</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mã sản phẩm"
                value={editingProduct.code}
                onChange={(e) => setEditingProduct({ ...editingProduct, code: e.target.value })}
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Mô tả sản phẩm</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập mô tả sản phẩm"
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="productBasePrice">
              <Form.Label>Giá cơ bản (VNĐ)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập giá cơ bản"
                value={editingProduct.basePrice}
                onChange={(e) => setEditingProduct({ ...editingProduct, basePrice: e.target.value })}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="productImage">
              <Form.Label>Hình ảnh sản phẩm</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-2 text-center">
                  <Image 
                    src={imagePreview} 
                    alt="Hình ảnh sản phẩm" 
                    style={{ maxHeight: '200px', maxWidth: '100%' }} 
                    thumbnail 
                  />
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProductModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveProduct} disabled={productModalLoading}>
            {productModalLoading ? <Spinner animation="border" size="sm" /> : 'Lưu'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal xác nhận xóa sản phẩm */}
      <Modal show={showDeleteProductModal} onHide={() => setShowDeleteProductModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa sản phẩm <strong>{deletingProduct?.name}</strong>?
          <p className="text-danger mt-2">Lưu ý: Hành động này không thể hoàn tác.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteProductModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct} disabled={deleteProductLoading}>
            {deleteProductLoading ? <Spinner animation="border" size="sm" /> : 'Xóa'}
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Modal xem thuộc tính sản phẩm */}
      <Modal show={showAttributesModal} onHide={() => setShowAttributesModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thuộc tính sản phẩm: {selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {attributesError && <Alert variant="danger">{attributesError}</Alert>}
          
          {attributesLoading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Đang tải thông tin sản phẩm...</p>
            </div>
          ) : (
            <>
              <div className="mb-4 row">
                <div className="col-md-6">
                  <h5>Thông tin cơ bản</h5>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Tên sản phẩm:</label>
                    <p>{selectedProduct?.name || 'Chưa cập nhật'}</p>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label fw-bold">Mã sản phẩm:</label>
                    <p>{selectedProduct?.code || 'Chưa cập nhật'}</p>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label fw-bold">Giá cơ bản:</label>
                    <p>{selectedProduct?.basePrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedProduct.basePrice) : 'Chưa cập nhật'}</p>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label fw-bold">Mô tả:</label>
                    <p>{selectedProduct?.description || 'Chưa cập nhật'}</p>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <h5 className="mb-3">Hình ảnh sản phẩm</h5>
                  {selectedProduct && selectedProduct.image && selectedProduct.image.base64 ? (
                    <div className="text-center">
                      <Image 
                        src={`data:image/jpeg;base64,${selectedProduct.image.base64}`} 
                        alt={selectedProduct.name} 
                        style={{ maxHeight: '200px', maxWidth: '100%' }} 
                        thumbnail 
                      />
                    </div>
                  ) : (
                    <p className="text-muted">Không có hình ảnh</p>
                  )}
                </div>
              </div>
              
              <hr />
              
              <h5>Thuộc tính sản phẩm</h5>
              {productAttributes.length === 0 ? (
                <p className="text-muted">Sản phẩm này chưa có thuộc tính nào</p>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th style={{ width: '30%' }}>Tên thuộc tính</th>
                      <th>Giá trị</th>
                      <th style={{ width: '15%' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productAttributes.map((attribute) => (
                      <tr key={attribute.id}>
                        <td>{attribute.attribute?.name || 'Không xác định'}</td>
                        <td>{attribute.value || 'Chưa cập nhật'}</td>
                        <td>
                          <Button variant="warning" size="sm" onClick={() => handleEditAttribute(attribute)}>
                            <i className="bi bi-pencil-square"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAttributesModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Modal chỉnh sửa thuộc tính */}
      <Modal show={showEditAttributeModal} onHide={() => setShowEditAttributeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Chỉnh sửa thuộc tính: {editingAttribute.attribute?.name || 'Không xác định'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {attributeModalError && <Alert variant="danger">{attributeModalError}</Alert>}
          <Form>
            <Form.Group className="mb-3" controlId="attributeName">
              <Form.Label>Tên thuộc tính</Form.Label>
              <Form.Control
                type="text"
                value={editingAttribute.attribute?.name || ''}
                readOnly
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="attributeValue">
              <Form.Label>Giá trị thuộc tính</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập giá trị thuộc tính"
                value={editingAttribute.value}
                onChange={(e) => setEditingAttribute({ ...editingAttribute, value: e.target.value })}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditAttributeModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveAttribute} disabled={attributeModalLoading}>
            {attributeModalLoading ? <Spinner animation="border" size="sm" /> : 'Lưu'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductLineManagement; 