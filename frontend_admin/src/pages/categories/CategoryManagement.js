import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Form, Modal, Spinner, Alert, InputGroup } from 'react-bootstrap';
import { categoryService } from '../../services/categoryService';

const CategoryManagement = () => {
  // State quản lý danh sách danh mục
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State cho modal thêm/sửa danh mục
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');
  
  // State cho form thêm/sửa danh mục
  const [editingCategory, setEditingCategory] = useState({ id: null, name: '' });
  
  // State cho modal xác nhận xóa
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  // State cho thông báo thao tác
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  // State cho tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [isSearchResult, setIsSearchResult] = useState(false);

  // Lấy danh sách danh mục khi component được mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Hàm lấy danh sách danh mục sản phẩm từ API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError('');
      setIsSearchResult(false);
      
      console.log('[CATEGORY MANAGEMENT] Đang lấy danh sách danh mục sản phẩm');
      const response = await categoryService.getCategories();
      
      if (response && response.data) {
        console.log('[CATEGORY MANAGEMENT] Đã lấy danh sách danh mục:', response.data);
        setCategories(response.data);
      } else {
        console.error('[CATEGORY MANAGEMENT] Phản hồi API không hợp lệ:', response);
        setError('Không thể lấy danh sách danh mục sản phẩm');
      }
    } catch (err) {
      console.error('[CATEGORY MANAGEMENT] Lỗi khi lấy danh sách danh mục:', err);
      setError('Đã xảy ra lỗi khi lấy danh sách danh mục sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  // Hàm tìm kiếm danh mục theo tên
  const searchCategories = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      // Nếu không có từ khóa, hiển thị lại toàn bộ danh sách
      return fetchCategories();
    }

    try {
      setSearchLoading(true);
      setError('');
      
      console.log('[CATEGORY MANAGEMENT] Đang tìm kiếm danh mục với từ khóa:', searchTerm);
      const response = await categoryService.searchCategoriesByName(searchTerm);
      
      if (response && response.data) {
        console.log('[CATEGORY MANAGEMENT] Kết quả tìm kiếm danh mục:', response.data);
        setCategories(response.data);
        setIsSearchResult(true);
      } else {
        console.error('[CATEGORY MANAGEMENT] Phản hồi API tìm kiếm không hợp lệ:', response);
        setError('Không thể tìm kiếm danh mục sản phẩm');
      }
    } catch (err) {
      console.error('[CATEGORY MANAGEMENT] Lỗi khi tìm kiếm danh mục:', err);
      setError('Đã xảy ra lỗi khi tìm kiếm danh mục sản phẩm');
    } finally {
      setSearchLoading(false);
    }
  };

  // Hàm xử lý xóa từ khóa tìm kiếm và hiển thị lại toàn bộ danh sách
  const clearSearch = () => {
    setSearchTerm('');
    fetchCategories();
  };

  // Hàm mở modal thêm danh mục mới
  const handleAddCategory = () => {
    setModalTitle('Thêm danh mục sản phẩm mới');
    setEditingCategory({ id: null, name: '' });
    setModalError('');
    setShowModal(true);
  };

  // Hàm mở modal sửa danh mục
  const handleEditCategory = (category) => {
    setModalTitle('Cập nhật danh mục sản phẩm');
    setEditingCategory({ ...category });
    setModalError('');
    setShowModal(true);
  };

  // Hàm lưu danh mục (thêm mới hoặc cập nhật)
  const handleSaveCategory = async () => {
    // Kiểm tra tên danh mục
    if (!editingCategory.name.trim()) {
      setModalError('Vui lòng nhập tên danh mục');
      return;
    }

    try {
      setModalLoading(true);
      setModalError('');

      if (editingCategory.id) {
        // Cập nhật danh mục
        console.log('[CATEGORY MANAGEMENT] Đang cập nhật danh mục:', editingCategory);
        await categoryService.updateCategory(editingCategory.id, editingCategory.name);
        
        // Cập nhật danh sách
        setCategories(prevCategories => 
          prevCategories.map(cat => 
            cat.id === editingCategory.id ? { ...cat, name: editingCategory.name } : cat
          )
        );
        
        // Hiển thị thông báo
        showNotification('success', 'Cập nhật danh mục thành công');
      } else {
        // Thêm danh mục mới
        console.log('[CATEGORY MANAGEMENT] Đang thêm danh mục mới:', editingCategory.name);
        const response = await categoryService.addCategory(editingCategory.name);
        
        // Cập nhật danh sách
        if (response && response.data) {
          setCategories(prevCategories => [...prevCategories, response.data]);
        }
        
        // Hiển thị thông báo
        showNotification('success', 'Thêm danh mục thành công');
      }

      // Đóng modal
      setShowModal(false);
    } catch (err) {
      console.error('[CATEGORY MANAGEMENT] Lỗi khi lưu danh mục:', err);
      setModalError('Đã xảy ra lỗi khi lưu danh mục sản phẩm');
    } finally {
      setModalLoading(false);
    }
  };

  // Hàm mở modal xác nhận xóa danh mục
  const handleDeleteConfirm = (category) => {
    setDeletingCategory(category);
    setShowDeleteModal(true);
  };

  // Hàm xóa danh mục
  const handleDeleteCategory = async () => {
    if (!deletingCategory) return;

    try {
      setDeleteLoading(true);
      
      console.log('[CATEGORY MANAGEMENT] Đang xóa danh mục:', deletingCategory);
      await categoryService.deleteCategory(deletingCategory.id);
      
      // Cập nhật danh sách
      setCategories(prevCategories => 
        prevCategories.filter(cat => cat.id !== deletingCategory.id)
      );
      
      // Hiển thị thông báo
      showNotification('success', 'Xóa danh mục thành công');
      
      // Đóng modal
      setShowDeleteModal(false);
    } catch (err) {
      console.error('[CATEGORY MANAGEMENT] Lỗi khi xóa danh mục:', err);
      showNotification('danger', 'Đã xảy ra lỗi khi xóa danh mục sản phẩm');
    } finally {
      setDeleteLoading(false);
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

  return (
    <Container>
      <h2 className="mb-4">Quản lý danh mục sản phẩm</h2>

      {/* Hiển thị thông báo */}
      {notification.show && (
        <Alert variant={notification.type} onClose={() => setNotification({ show: false, type: '', message: '' })} dismissible>
          {notification.message}
        </Alert>
      )}

      {/* Form tìm kiếm */}
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={searchCategories}>
            <Form.Group as={InputGroup}>
              <Form.Control
                type="text"
                placeholder="Nhập tên danh mục cần tìm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button variant="outline-secondary" onClick={clearSearch}>
                  <i className="bi bi-x"></i>
                </Button>
              )}
              <Button type="submit" variant="primary" disabled={searchLoading}>
                {searchLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <i className="bi bi-search"></i>
                )}
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center card-header-tgdd">
          <span>
            {isSearchResult 
              ? `Kết quả tìm kiếm: "${searchTerm}" (${categories.length} danh mục)` 
              : 'Danh sách danh mục sản phẩm'
            }
          </span>
          <div>
            {isSearchResult && (
              <Button variant="outline-light" size="sm" className="me-2" onClick={clearSearch}>
                <i className="bi bi-arrow-left me-1"></i> Quay lại
              </Button>
            )}
            <Button variant="light" size="sm" onClick={handleAddCategory}>
              <i className="bi bi-plus-circle me-1"></i> Thêm danh mục
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Đang tải danh sách danh mục...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : categories.length === 0 ? (
            <div className="text-center py-4">
              {isSearchResult ? (
                <>
                  <p className="text-muted">Không tìm thấy danh mục phù hợp với từ khóa "{searchTerm}"</p>
                  <Button variant="outline-secondary" onClick={clearSearch}>
                    <i className="bi bi-arrow-left me-1"></i> Quay lại danh sách
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-muted">Chưa có danh mục sản phẩm nào</p>
                  <Button variant="primary" onClick={handleAddCategory}>
                    <i className="bi bi-plus-circle me-1"></i> Thêm danh mục mới
                  </Button>
                </>
              )}
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>#</th>
                  <th>Tên danh mục</th>
                  <th style={{ width: '15%' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditCategory(category)}>
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteConfirm(category)}>
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

      {/* Modal thêm/sửa danh mục */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalError && <Alert variant="danger">{modalError}</Alert>}
          <Form>
            <Form.Group className="mb-3" controlId="categoryName">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên danh mục"
                value={editingCategory.name}
                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveCategory} disabled={modalLoading}>
            {modalLoading ? <Spinner animation="border" size="sm" /> : 'Lưu'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal xác nhận xóa danh mục */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa danh mục <strong>{deletingCategory?.name}</strong>?
          <p className="text-danger mt-2">Lưu ý: Hành động này không thể hoàn tác.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDeleteCategory} disabled={deleteLoading}>
            {deleteLoading ? <Spinner animation="border" size="sm" /> : 'Xóa'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CategoryManagement; 