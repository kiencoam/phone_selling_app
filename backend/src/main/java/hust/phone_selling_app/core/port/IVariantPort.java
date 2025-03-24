package hust.phone_selling_app.core.port;

import java.util.List;

import hust.phone_selling_app.core.domain.entity.VariantEntity;

public interface IVariantPort {

    public VariantEntity save(VariantEntity variantEntity);

    public VariantEntity update(VariantEntity variantEntity);

    public void delete(Long id);

    public void deleteByProductId(Long productId);

    public VariantEntity findById(Long id);

    public List<VariantEntity> findByProductId(Long productId);

}
