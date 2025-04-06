package hust.phone_selling_app.interfaces.order.facade.internal.assembler;

import hust.phone_selling_app.domain.order.Order;
import hust.phone_selling_app.interfaces.order.facade.dto.OrderDTO;

public class OrderAssembler {

    public static OrderDTO toDTO(Order order) {
        if (order == null) {
            return null;
        }
        return OrderDTO.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .phone(order.getPhone())
                .address(order.getAddress())
                .receiveName(order.getReceiveName())
                .paymentMethod(order.getPaymentMethod())
                .receiveMethod(order.getReceiveMethod())
                .status(order.getStatus())
                .totalPrice(order.getTotalPrice())
                .note(order.getNote())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .orderItems(order.getOrderItems().stream()
                        .map(OrderItemAssembler::toDTO)
                        .toList())
                .build();
    }

}
