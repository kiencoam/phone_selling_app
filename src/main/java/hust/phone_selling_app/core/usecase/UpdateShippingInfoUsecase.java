package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.constant.ErrorCode;
import hust.phone_selling_app.core.domain.dto.request.UpdateShippingInfoRequestDto;
import hust.phone_selling_app.core.domain.entity.ShippingInfoEntity;
import hust.phone_selling_app.core.exception.AppException;
import hust.phone_selling_app.core.port.IShippingInfoPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UpdateShippingInfoUsecase {

    private final IShippingInfoPort shippingInfoPort;

    public ShippingInfoEntity update(UpdateShippingInfoRequestDto request) {
        ShippingInfoEntity shippingInfo = shippingInfoPort.findById(request.getId());
        if (shippingInfo == null) {
            log.info("Shipping info is not existed");
            throw new AppException(ErrorCode.SHIPPING_INFO_NOT_FOUND);
        }
        shippingInfo.setPhone(request.getPhone());
        shippingInfo.setAddress(request.getAddress());
        shippingInfo.setReceiveName(request.getReceiveName());
        return shippingInfoPort.save(shippingInfo);
    }

}
