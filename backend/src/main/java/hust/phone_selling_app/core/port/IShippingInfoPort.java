package hust.phone_selling_app.core.port;

import java.util.List;

import hust.phone_selling_app.core.domain.entity.ShippingInfoEntity;

public interface IShippingInfoPort {

    public ShippingInfoEntity save(ShippingInfoEntity shippingInfoEntity);

    public ShippingInfoEntity update(ShippingInfoEntity shippingInfoEntity);

    public void delete(Long id);

    public void deleteByCustomerId(Long customerId);

    public ShippingInfoEntity findById(Long id);

    public List<ShippingInfoEntity> findByCustomerId(Long customerId);

}
