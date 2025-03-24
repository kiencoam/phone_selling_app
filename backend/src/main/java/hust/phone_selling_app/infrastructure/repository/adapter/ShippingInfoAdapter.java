package hust.phone_selling_app.infrastructure.repository.adapter;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.ShippingInfoEntity;
import hust.phone_selling_app.core.port.IShippingInfoPort;
import hust.phone_selling_app.infrastructure.repository.IShippingInfoRepository;
import hust.phone_selling_app.infrastructure.repository.mapper.ShippingInfoMapper;
import hust.phone_selling_app.infrastructure.repository.model.ShippingInfoModel;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShippingInfoAdapter implements IShippingInfoPort {

    private final IShippingInfoRepository shippingInfoRepository;

    @Override
    public ShippingInfoEntity save(ShippingInfoEntity shippingInfoEntity) {
        ShippingInfoModel model = ShippingInfoMapper.INSTANCE.toModel(shippingInfoEntity);
        model = shippingInfoRepository.save(model);
        return ShippingInfoMapper.INSTANCE.toEntity(model);
    }

    @Override
    public ShippingInfoEntity update(ShippingInfoEntity shippingInfoEntity) {
        ShippingInfoModel model = ShippingInfoMapper.INSTANCE.toModel(shippingInfoEntity);
        model = shippingInfoRepository.save(model);
        return ShippingInfoMapper.INSTANCE.toEntity(model);
    }

    @Override
    public void delete(Long id) {
        shippingInfoRepository.deleteById(id);
    }

    @Override
    public void deleteByCustomerId(Long customerId) {
        shippingInfoRepository.deleteByCustomerId(customerId);
    }

    @Override
    public ShippingInfoEntity findById(Long id) {
        ShippingInfoModel model = shippingInfoRepository.findById(id).orElse(null);
        return ShippingInfoMapper.INSTANCE.toEntity(model);
    }

    @Override
    public List<ShippingInfoEntity> findByCustomerId(Long customerId) {
        List<ShippingInfoModel> models = shippingInfoRepository.findByCustomerId(customerId);
        return models.stream().map(ShippingInfoMapper.INSTANCE::toEntity).toList();
    }

}
