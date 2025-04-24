package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.user.ShippingInfo;
import hust.phone_selling_app.infrastructure.persistence.model.ShippingInfoModel;

public class ShippingInfoAssembler {

    public static ShippingInfoModel toModel(ShippingInfo shippingInfo) {
        if (shippingInfo == null) {
            return null;
        }

        return ShippingInfoModel.builder()
                .id(shippingInfo.getId())
                .phone(shippingInfo.getPhone())
                .address(shippingInfo.getAddress())
                .receiveName(shippingInfo.getReceiveName())
                .build();
    }

    public static ShippingInfo toDomain(ShippingInfoModel shippingInfoModel) {
        if (shippingInfoModel == null) {
            return null;
        }

        return ShippingInfo.builder()
                .id(shippingInfoModel.getId())
                .phone(shippingInfoModel.getPhone())
                .address(shippingInfoModel.getAddress())
                .receiveName(shippingInfoModel.getReceiveName())
                .build();
    }

}
