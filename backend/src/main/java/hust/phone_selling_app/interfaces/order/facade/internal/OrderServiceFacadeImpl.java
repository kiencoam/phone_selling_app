package hust.phone_selling_app.interfaces.order.facade.internal;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import hust.phone_selling_app.application.OrderService;
import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.image.ImageRepository;
import hust.phone_selling_app.domain.order.Order;
import hust.phone_selling_app.domain.order.OrderRepository;
import hust.phone_selling_app.domain.shared.OrderSearchCriteria;
import hust.phone_selling_app.interfaces.order.facade.OrderServiceFacade;
import hust.phone_selling_app.interfaces.order.facade.dto.OrderDTO;
import hust.phone_selling_app.interfaces.order.facade.internal.assembler.OrderAssembler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceFacadeImpl implements OrderServiceFacade {

    private final OrderService orderService;
    private final OrderRepository orderRepository;
    private final ImageRepository imageRepository;

    @Override
    public OrderDTO createOrderFromVariant(Long variantId, Integer quantity, Long userId, Long shippingInfoId,
            String paymentMethod, String receiveMethod, String note) {
        Order order = orderService.createOrderFromVariant(variantId, quantity, userId, shippingInfoId, paymentMethod,
                receiveMethod, note);
        OrderDTO orderDTO = OrderAssembler.toDTO(order);
        return orderDTO;
    }

    @Override
    public OrderDTO createOrderFromCart(Long userId, Long shippingInfoId, String paymentMethod, String receiveMethod,
            String note) {
        Order order = orderService.createOrderFromCart(userId, shippingInfoId, paymentMethod, receiveMethod, note);
        OrderDTO orderDTO = OrderAssembler.toDTO(order);
        return orderDTO;
    }

    @Override
    public void confirmOrder(Long orderId) {
        Order order = orderRepository.findById(orderId);
        if (order == null) {
            log.error("Order not found with id: {}", orderId);
            throw new AppException(ErrorCode.ORDER_NOT_FOUND);
        }

        orderRepository.confirmOrder(order);
    }

    @Override
    public void cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId);
        if (order == null) {
            log.error("Order not found with id: {}", orderId);
            throw new AppException(ErrorCode.ORDER_NOT_FOUND);
        }

        orderService.cancelOrder(order);
    }

    @Override
    public void deliverOrder(Long orderId) {
        Order order = orderRepository.findById(orderId);
        if (order == null) {
            log.error("Order not found with id: {}", orderId);
            throw new AppException(ErrorCode.ORDER_NOT_FOUND);
        }

        orderRepository.deliverOrder(order);
    }

    @Override
    public void receiveOrder(Long orderId) {
        Order order = orderRepository.findById(orderId);
        if (order == null) {
            log.error("Order not found with id: {}", orderId);
            throw new AppException(ErrorCode.ORDER_NOT_FOUND);
        }

        orderService.receiveOrder(order);
    }

    @Override
    public void cancelCustomerOrder(Long orderId, Long userId) {
        Order order = orderRepository.findById(orderId);
        if (order == null) {
            log.error("Order not found with id: {}", orderId);
            throw new AppException(ErrorCode.ORDER_NOT_FOUND);
        }
        if (!order.getUserId().equals(userId)) {
            log.error("Order with id: {} does not belong to user with id: {}", orderId, userId);
            throw new AppException(ErrorCode.ORDER_NOT_FOUND);
        }

        orderService.cancelOrder(order);
    }

    @Override
    public OrderDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId);
        if (order == null) {
            log.error("Order not found with id: {}", orderId);
            throw new AppException(ErrorCode.ORDER_NOT_FOUND);
        }

        OrderDTO orderDTO = OrderAssembler.toDTO(order);
        orderDTO.getOrderItems().forEach(orderItem -> {
            Image image = imageRepository.findById(orderItem.getImage().getId());
            if (image == null) {
                orderItem.setImage(null);
            } else {
                orderItem.setImage(image);
            }
        });

        return orderDTO;
    }

    @Override
    public OrderDTO getOrderByIdAndUserId(Long orderId, Long userId) {
        Order order = orderRepository.findById(orderId);
        if (order == null) {
            log.error("Order not found with id: {}", orderId);
            throw new AppException(ErrorCode.ORDER_NOT_FOUND);
        }
        if (!order.getUserId().equals(userId)) {
            log.error("Order with id: {} does not belong to user with id: {}", orderId, userId);
            throw new AppException(ErrorCode.ORDER_NOT_FOUND);
        }

        OrderDTO orderDTO = OrderAssembler.toDTO(order);
        orderDTO.getOrderItems().forEach(orderItem -> {
            Image image = imageRepository.findById(orderItem.getImage().getId());
            if (image == null) {
                orderItem.setImage(null);
            } else {
                orderItem.setImage(image);
            }
        });

        return orderDTO;
    }

    @Override
    public List<OrderDTO> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream().map(OrderAssembler::toDTO).toList();
    }

    @Override
    public List<OrderDTO> getOrdersByUserIdAndStatus(Long userId, String status) {
        List<Order> orders = orderRepository.findByUserIdAndStatus(userId, status);
        return orders.stream().map(OrderAssembler::toDTO).toList();
    }

    @Override
    public Page<OrderDTO> searchOrders(OrderSearchCriteria criteria) {
        Page<Order> orders = orderRepository.search(criteria);
        return orders.map(OrderAssembler::toDTO);
    }

}
