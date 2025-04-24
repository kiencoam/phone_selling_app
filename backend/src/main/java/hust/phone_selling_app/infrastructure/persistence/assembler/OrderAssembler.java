package hust.phone_selling_app.infrastructure.persistence.assembler;

import java.util.List;

import hust.phone_selling_app.domain.order.Order;
import hust.phone_selling_app.infrastructure.persistence.model.OrderModel;

public class OrderAssembler {

    public static Order toDomain(OrderModel orderModel) {
        if (orderModel == null) {
            return null;
        }
        return Order.builder()
                .id(orderModel.getId())
                .userId(orderModel.getUserId())
                .phone(orderModel.getPhone())
                .address(orderModel.getAddress())
                .receiveName(orderModel.getReceiveName())
                .paymentMethod(orderModel.getPaymentMethod())
                .receiveMethod(orderModel.getReceiveMethod())
                .status(orderModel.getStatus())
                .totalPrice(orderModel.getTotalPrice())
                .note(orderModel.getNote())
                .createdAt(orderModel.getCreatedAt())
                .updatedAt(orderModel.getUpdatedAt())
                .orderItems(List.of())
                .build();
    }

    public static OrderModel toModel(Order order) {
        if (order == null) {
            return null;
        }
        OrderModel orderModel = OrderModel.builder()
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
                .build();
        orderModel.setCreatedAt(order.getCreatedAt());
        orderModel.setUpdatedAt(order.getUpdatedAt());
        return orderModel;
    }

}
