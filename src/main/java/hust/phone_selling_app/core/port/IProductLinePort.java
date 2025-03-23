package hust.phone_selling_app.core.port;

import hust.phone_selling_app.core.domain.entity.ProductLineEntity;

public interface IProductLinePort {

    public ProductLineEntity save(ProductLineEntity productLineEntity);

    public ProductLineEntity update(ProductLineEntity productLineEntity);

    public void delete(Long id);

    public ProductLineEntity findById(Long id);

    public ProductLineEntity findByProductId(Long productId);

}
