package hust.phone_selling_app.core.service;

import java.util.List;

import hust.phone_selling_app.core.domain.dto.request.CreateShippingInfoRequestDto;
import hust.phone_selling_app.core.domain.dto.request.UpdateShippingInfoRequestDto;
import hust.phone_selling_app.core.domain.entity.ShippingInfoEntity;

public interface IShippingInfoService {

    public ShippingInfoEntity save(CreateShippingInfoRequestDto shippingInfoEntity);

    public ShippingInfoEntity update(UpdateShippingInfoRequestDto shippingInfoEntity);

    public void delete(Long id, Long customerId);

    public void deleteByCustomerId(Long customerId);

    public ShippingInfoEntity findById(Long id);

    public List<ShippingInfoEntity> findByCustomerId(Long customerId);

}
