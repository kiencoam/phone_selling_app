package hust.phone_selling_app.interfaces.order.facade.internal.assembler;

import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.order.OrderItem;
import hust.phone_selling_app.interfaces.order.facade.dto.OrderItemDTO;

public class OrderItemAssembler {

    public static OrderItemDTO toDTO(OrderItem orderItem) {
        if (orderItem == null) {
            return null;
        }
        return OrderItemDTO.builder()
                .id(orderItem.getId())
                .variantId(orderItem.getVariantId())
                .name(orderItem.getName())
                .color(orderItem.getColor())
                .price(orderItem.getPrice())
                .quantity(orderItem.getQuantity())
                .image(Image.builder()
                        .id(orderItem.getImageId())
                        .build())
                .build();
    }

}
