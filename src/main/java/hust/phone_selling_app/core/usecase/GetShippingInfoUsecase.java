package hust.phone_selling_app.core.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.ShippingInfoEntity;
import hust.phone_selling_app.core.port.IShippingInfoPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GetShippingInfoUsecase {

    private final IShippingInfoPort shippingInfoPort;

    public ShippingInfoEntity findById(Long id) {
        return shippingInfoPort.findById(id);
    }

    public List<ShippingInfoEntity> findByCustomerId(Long customerId) {
        return shippingInfoPort.findByCustomerId(customerId);
    }

}
