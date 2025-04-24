package hust.phone_selling_app.application.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.application.OrderService;
import hust.phone_selling_app.domain.order.Order;
import hust.phone_selling_app.domain.order.OrderFactory;
import hust.phone_selling_app.domain.order.OrderRepository;
import hust.phone_selling_app.domain.reviewpermission.ReviewPermission;
import hust.phone_selling_app.domain.reviewpermission.ReviewPermissionRepository;
import hust.phone_selling_app.domain.user.UserRepository;
import hust.phone_selling_app.domain.variant.Variant;
import hust.phone_selling_app.domain.variant.VariantRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderFactory orderFactory;
    private final OrderRepository orderRepository;
    private final VariantRepository variantRepository;
    private final UserRepository userRepository;
    private final ReviewPermissionRepository reviewPermissionRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Order createOrderFromVariant(Long variantId,
            Integer quantity,
            Long userId,
            Long shippingInfoId,
            String paymentMethod,
            String receiveMethod,
            String note) {
        Order order = orderFactory.createOrderFromVariant(variantId,
                quantity,
                userId,
                shippingInfoId,
                paymentMethod,
                receiveMethod,
                note);

        return save(order);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Order createOrderFromCart(Long userId,
            Long shippingInfoId,
            String paymentMethod,
            String receiveMethod,
            String note) {

        Order order = orderFactory.createOrderFromCart(userId,
                shippingInfoId,
                paymentMethod,
                receiveMethod,
                note);

        // Xoa cac item trong cart
        userRepository.removeCartItemsByUserId(userId);

        return save(order);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void cancelOrder(Order order) {
        orderRepository.cancelOrder(order);

        // Update the stock of variants in the order
        order.getOrderItems().forEach(orderItem -> {
            variantRepository.returnItem(orderItem.getVariantId(), orderItem.getQuantity().longValue());
        });
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void receiveOrder(Order order) {
        orderRepository.receiveOrder(order);

        // Create review permission for the user
        order.getOrderItems().forEach(orderItem -> {
            Variant variant = variantRepository.findById(orderItem.getVariantId());
            ReviewPermission reviewPermission = ReviewPermission.builder()
                    .userId(order.getUserId())
                    .productId(variant.getProductId())
                    .build();
            reviewPermissionRepository.create(reviewPermission);
        });
    }

    private Order save(Order order) {
        Order savedOrder = orderRepository.save(order);

        // Update the stock of variants in the order
        order.getOrderItems().forEach(orderItem -> {
            variantRepository.sell(orderItem.getVariantId(), orderItem.getQuantity().longValue());
        });

        return savedOrder;
    }

}
