package hust.phone_selling_app.core.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.dto.request.CreateShippingInfoRequestDto;
import hust.phone_selling_app.core.domain.dto.request.UpdateShippingInfoRequestDto;
import hust.phone_selling_app.core.domain.entity.ShippingInfoEntity;
import hust.phone_selling_app.core.service.IShippingInfoService;
import hust.phone_selling_app.core.usecase.CreateShippingInfoUsecase;
import hust.phone_selling_app.core.usecase.DeleteShippingInfoUsecase;
import hust.phone_selling_app.core.usecase.GetShippingInfoUsecase;
import hust.phone_selling_app.core.usecase.UpdateShippingInfoUsecase;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IShippingInfoServiceImpl implements IShippingInfoService {

    private final CreateShippingInfoUsecase createShippingInfoUsercase;
    private final UpdateShippingInfoUsecase updateShippingInfoUsercase;
    private final DeleteShippingInfoUsecase deleteShippingInfoUsercase;
    private final GetShippingInfoUsecase getShippingInfoUsecase;

    @Override
    public ShippingInfoEntity save(CreateShippingInfoRequestDto shippingInfoEntity) {
        return createShippingInfoUsercase.create(shippingInfoEntity);
    }

    @Override
    public ShippingInfoEntity update(UpdateShippingInfoRequestDto shippingInfoEntity) {
        return updateShippingInfoUsercase.update(shippingInfoEntity);
    }

    @Override
    public void delete(Long id, Long customerId) {
        deleteShippingInfoUsercase.delete(id, customerId);
    }

    @Override
    public void deleteByCustomerId(Long customerId) {
        deleteShippingInfoUsercase.deleteByCustomerId(customerId);
    }

    @Override
    public ShippingInfoEntity findById(Long id) {
        return getShippingInfoUsecase.findById(id);
    }

    @Override
    public List<ShippingInfoEntity> findByCustomerId(Long customerId) {
        return getShippingInfoUsecase.findByCustomerId(customerId);
    }

}
