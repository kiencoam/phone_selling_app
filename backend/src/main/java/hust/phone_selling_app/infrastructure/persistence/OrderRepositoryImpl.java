package hust.phone_selling_app.infrastructure.persistence;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.order.Order;
import hust.phone_selling_app.domain.order.OrderItem;
import hust.phone_selling_app.domain.order.OrderRepository;
import hust.phone_selling_app.domain.order.OrderStatus;
import hust.phone_selling_app.domain.order.ReceiveMethod;
import hust.phone_selling_app.domain.shared.OrderSearchCriteria;
import hust.phone_selling_app.infrastructure.persistence.assembler.OrderAssembler;
import hust.phone_selling_app.infrastructure.persistence.assembler.OrderItemAssembler;
import hust.phone_selling_app.infrastructure.persistence.jpa.OrderItemRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.jpa.OrderRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.model.OrderItemModel;
import hust.phone_selling_app.infrastructure.persistence.model.OrderModel;
import hust.phone_selling_app.infrastructure.persistence.specification.OrderSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderRepositoryImpl implements OrderRepository {

    private final OrderRepositoryJpa orderRepository;
    private final OrderItemRepositoryJpa orderItemRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Order save(Order order) {
        // Luu thong tin order vao database
        OrderModel orderModel = OrderAssembler.toModel(order);
        OrderModel savedOrderModel = orderRepository.save(orderModel);

        // Luu danh sach order item vao database
        List<OrderItem> orderItems = order.getOrderItems().stream().map(orderItem -> {
            OrderItemModel orderItemModel = OrderItemAssembler.toModel(orderItem);
            orderItemModel.setOrderId(savedOrderModel.getId());
            return OrderItemAssembler.toDomain(orderItemRepository.save(orderItemModel));
        }).toList();

        Order savedOrder = OrderAssembler.toDomain(savedOrderModel);
        savedOrder.setOrderItems(orderItems);
        return savedOrder;
    }

    @Override
    public void confirmOrder(Order order) {
        if (order.getStatus().equals(OrderStatus.PENDING.value())) {
            order.setStatus(OrderStatus.CONFIRMED.value());
            orderRepository.save(OrderAssembler.toModel(order));
        } else {
            log.error("Order status is not pending, cannot confirm order");
            throw new AppException(ErrorCode.ORDER_STATUS_NOT_VALID);
        }
    }

    @Override
    public void deliverOrder(Order order) {
        if (order.getStatus().equals(OrderStatus.CONFIRMED.value())
                && order.getReceiveMethod().equals(ReceiveMethod.DELIVERY.value())) {
            order.setStatus(OrderStatus.DELIVERING.value());
            orderRepository.save(OrderAssembler.toModel(order));
        } else {
            log.error("Order status is not confirmed, cannot deliver order");
            throw new AppException(ErrorCode.ORDER_STATUS_NOT_VALID);
        }
    }

    @Override
    public void cancelOrder(Order order) {
        if (!order.getStatus().equals(OrderStatus.RECEIVED.value())) {
            order.setStatus(OrderStatus.CANCELED.value());
            orderRepository.save(OrderAssembler.toModel(order));
        } else {
            log.error("Order status is received already, cannot cancel order");
            throw new AppException(ErrorCode.ORDER_STATUS_NOT_VALID);
        }
    }

    @Override
    public void receiveOrder(Order order) {
        if (order.getStatus().equals(OrderStatus.DELIVERING.value()) ||
                (order.getStatus().equals(OrderStatus.CONFIRMED.value())
                        && order.getReceiveMethod().equals(ReceiveMethod.PICKUP.value()))) {
            order.setStatus(OrderStatus.RECEIVED.value());
            orderRepository.save(OrderAssembler.toModel(order));
        } else {
            log.error("Order status is not delivering or confirmed, cannot receive order");
            throw new AppException(ErrorCode.ORDER_STATUS_NOT_VALID);
        }
    }

    @Override
    public Page<Order> search(OrderSearchCriteria criteria) {
        Pageable pageable = criteria.toPageable();
        Page<OrderModel> orderModels = orderRepository
                .findAll(OrderSpecification.satisfySearchCriteria(criteria), pageable);
        return orderModels.map(OrderAssembler::toDomain);
    }

    @Override
    public Order findById(Long id) {
        OrderModel orderModel = orderRepository.findById(id).orElse(null);
        if (orderModel == null) {
            log.info("Order not found with id: {}", id);
            return null;
        }
        List<OrderItemModel> orderItemModels = orderItemRepository.findByOrderId(id);
        List<OrderItem> orderItems = orderItemModels.stream()
                .map(OrderItemAssembler::toDomain)
                .toList();
        Order order = OrderAssembler.toDomain(orderModel);
        order.setOrderItems(orderItems);
        return order;
    }

    @Override
    public List<Order> findByUserId(Long userId) {
        List<OrderModel> orderModels = orderRepository.findByUserId(userId);
        List<Order> orders = orderModels.stream()
                .map(OrderAssembler::toDomain)
                .toList();
        return orders;
    }

    @Override
    public List<Order> findByUserIdAndStatus(Long userId, String status) {
        List<OrderModel> orderModels = orderRepository.findByUserIdAndStatus(userId, status);
        List<Order> orders = orderModels.stream()
                .map(OrderAssembler::toDomain)
                .toList();
        return orders;
    }

}
