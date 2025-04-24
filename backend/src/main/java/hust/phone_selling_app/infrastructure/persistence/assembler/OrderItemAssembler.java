package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.order.OrderItem;
import hust.phone_selling_app.infrastructure.persistence.model.OrderItemModel;

public class OrderItemAssembler {

    public static OrderItem toDomain(OrderItemModel orderItemModel) {
        if (orderItemModel == null) {
            return null;
        }
        return OrderItem.builder()
                .id(orderItemModel.getId())
                .variantId(orderItemModel.getVariantId())
                .name(orderItemModel.getName())
                .color(orderItemModel.getColor())
                .imageId(orderItemModel.getImageId())
                .price(orderItemModel.getPrice())
                .quantity(orderItemModel.getQuantity())
                .build();
    }

    public static OrderItemModel toModel(OrderItem orderItem) {
        if (orderItem == null) {
            return null;
        }
        return OrderItemModel.builder()
                .id(orderItem.getId())
                .variantId(orderItem.getVariantId())
                .name(orderItem.getName())
                .color(orderItem.getColor())
                .imageId(orderItem.getImageId())
                .price(orderItem.getPrice())
                .quantity(orderItem.getQuantity())
                .build();
    }

}
