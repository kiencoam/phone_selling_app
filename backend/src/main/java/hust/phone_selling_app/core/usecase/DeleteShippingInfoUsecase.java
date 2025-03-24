package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.constant.ErrorCode;
import hust.phone_selling_app.core.domain.entity.ShippingInfoEntity;
import hust.phone_selling_app.core.exception.AppException;
import hust.phone_selling_app.core.port.IShippingInfoPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeleteShippingInfoUsecase {

    private final IShippingInfoPort shippingInfoPort;

    public void delete(Long id, Long customerId) {
        ShippingInfoEntity shippingInfo = shippingInfoPort.findById(id);
        if (shippingInfo == null) {
            log.info("Shipping info with id {} is not existed", id);
            throw new AppException(ErrorCode.SHIPPING_INFO_NOT_FOUND);
        }
        if (!shippingInfo.getCustomerId().equals(customerId)) {
            log.info("Shipping info with id {} is not belonged to customer with id {}", id, customerId);
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }
        shippingInfoPort.delete(id);
    }

    public void deleteByCustomerId(Long customerId) {
        shippingInfoPort.deleteByCustomerId(customerId);
    }

}
