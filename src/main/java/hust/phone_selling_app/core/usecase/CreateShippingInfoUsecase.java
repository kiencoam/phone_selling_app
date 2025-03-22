package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.dto.request.CreateShippingInfoRequestDto;
import hust.phone_selling_app.core.domain.entity.ShippingInfoEntity;
import hust.phone_selling_app.core.domain.mapper.ShippingInfoMapper;
import hust.phone_selling_app.core.port.IShippingInfoPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CreateShippingInfoUsecase {

    private final IShippingInfoPort shippingInfoPort;

    public ShippingInfoEntity create(CreateShippingInfoRequestDto request) {

        ShippingInfoEntity shippingInfo = ShippingInfoMapper.INSTANCE.toEntity(request);
        return shippingInfoPort.save(shippingInfo);
    }

}
