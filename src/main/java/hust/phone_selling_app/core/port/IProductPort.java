package hust.phone_selling_app.core.port;

import hust.phone_selling_app.core.domain.entity.ProductEntity;

public interface IProductPort {

    public ProductEntity save(ProductEntity productEntity);

    public ProductEntity update(ProductEntity productEntity);

    void delete(Long id);

    ProductEntity findById(Long id);

}
