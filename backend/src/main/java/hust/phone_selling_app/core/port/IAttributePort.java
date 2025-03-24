package hust.phone_selling_app.core.port;

import java.util.List;

import hust.phone_selling_app.core.domain.entity.AttributeEntity;

public interface IAttributePort {

    public AttributeEntity save(AttributeEntity attributeEntity);

    public AttributeEntity update(AttributeEntity attributeEntity);

    public void delete(Long id);

    public AttributeEntity findById(Long id);

    public List<AttributeEntity> findByProductId(Long productId);

}
