package hust.phone_selling_app.domain.order;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.product.Product;
import hust.phone_selling_app.domain.product.ProductRepository;
import hust.phone_selling_app.domain.productline.ProductLine;
import hust.phone_selling_app.domain.productline.ProductLineRepository;
import hust.phone_selling_app.domain.promotion.Promotion;
import hust.phone_selling_app.domain.promotion.PromotionRepository;
import hust.phone_selling_app.domain.user.CartItem;
import hust.phone_selling_app.domain.user.ShippingInfo;
import hust.phone_selling_app.domain.user.UserRepository;
import hust.phone_selling_app.domain.variant.Variant;
import hust.phone_selling_app.domain.variant.VariantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderFactory {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final VariantRepository variantRepository;
    private final ProductLineRepository productLineRepository;
    private final PromotionRepository promotionRepository;

    public Order createOrderFromVariant(Long variantId,
            Integer quantity,
            Long userId,
            Long shippingInfoId,
            String paymentMethod,
            String receiveMethod,
            String note) {

        // Kiem tra variant co ton tai khong
        Variant variant = variantRepository.findById(variantId);
        if (variant == null) {
            log.error("Variant with id {} not found", variantId);
            throw new AppException(ErrorCode.VARIANT_NOT_FOUND);
        }

        // Lay thong tin product (name, image, price)
        Product product = productRepository.findById(variant.getProductId());

        ProductLine productLine = productLineRepository.findById(product.getProductLineId());
        List<Promotion> promotions = promotionRepository.findInUsePromotionsByCategoryId(productLine.getCategoryId());
        Long discount = promotions.stream()
                .map(Promotion::getValue)
                .reduce(0L, Long::sum);
        Long price = product.getBasePrice() > discount ? product.getBasePrice() - discount : 0L;

        // Tao OrderItem (variantId, color, name, image, quantity, price)
        OrderItem orderItem = OrderItem.builder()
                .variantId(variantId)
                .color(variant.getColor())
                .name(product.getName())
                .imageId(product.getImageId())
                .quantity(quantity)
                .price(price)
                .build();

        // Tinh totalPrice = price * quantity
        Long totalPrice = price * quantity;

        // Kiem tra shippingInfo co ton tai khong
        ShippingInfo shippingInfo = userRepository.findShippingInfoById(shippingInfoId);
        if (shippingInfo == null) {
            log.error("ShippingInfo with id {} not found", shippingInfoId);
            throw new AppException(ErrorCode.SHIPPING_INFO_NOT_FOUND);
        }

        // Lay thong tin shippingInfo (phone, address, receiveName)

        // Tao Order (userId, phone, address, receiveName, paymentMethod, receiveMethod,
        // status=PENDING, totalPrice, note, orderItems)
        Order order = Order.builder()
                .userId(userId)
                .phone(shippingInfo.getPhone())
                .address(shippingInfo.getAddress())
                .receiveName(shippingInfo.getReceiveName())
                .paymentMethod(paymentMethod)
                .receiveMethod(receiveMethod)
                .status(OrderStatus.PENDING.value())
                .totalPrice(totalPrice)
                .note(note)
                .orderItems(List.of(orderItem))
                .build();

        return order;
    }

    public Order createOrderFromCart(Long userId,
            Long shippingInfoId,
            String paymentMethod,
            String receiveMethod,
            String note) {

        // Lay danh sach CartItem cua user
        List<CartItem> cartItems = userRepository.findCartItemsByUserId(userId);
        if (cartItems == null || cartItems.isEmpty()) {
            log.error("Cart is empty for user with id {}", userId);
            throw new AppException(ErrorCode.CART_EMPTY);
        }

        List<OrderItem> orderItems = cartItems.stream()
                .map(cartItem -> {
                    Variant variant = variantRepository.findById(cartItem.getVariantId());
                    Product product = productRepository.findById(variant.getProductId());

                    ProductLine productLine = productLineRepository.findById(product.getProductLineId());
                    List<Promotion> promotions = promotionRepository
                            .findInUsePromotionsByCategoryId(productLine.getCategoryId());
                    Long discount = promotions.stream()
                            .map(Promotion::getValue)
                            .reduce(0L, Long::sum);
                    Long price = product.getBasePrice() > discount ? product.getBasePrice() - discount : 0L;

                    // Tao OrderItem (variantId, color, name, image, quantity, price)
                    OrderItem orderItem = OrderItem.builder()
                            .variantId(cartItem.getVariantId())
                            .color(variant.getColor())
                            .name(product.getName())
                            .imageId(product.getImageId())
                            .quantity(cartItem.getQuantity())
                            .price(price)
                            .build();

                    return orderItem;
                }).toList();

        // Tinh totalPrice = price * quantity
        Long totalPrice = orderItems.stream()
                .map(orderItem -> orderItem.getPrice() * orderItem.getQuantity())
                .reduce(0L, Long::sum);

        // Kiem tra shippingInfo co ton tai khong
        ShippingInfo shippingInfo = userRepository.findShippingInfoById(shippingInfoId);
        if (shippingInfo == null) {
            log.error("ShippingInfo with id {} not found", shippingInfoId);
            throw new AppException(ErrorCode.SHIPPING_INFO_NOT_FOUND);
        }

        // Lay thong tin shippingInfo (phone, address, receiveName)

        // Tao Order (userId, phone, address, receiveName, paymentMethod, receiveMethod,
        // status=PENDING, totalPrice, note, orderItems)
        Order order = Order.builder()
                .userId(userId)
                .phone(shippingInfo.getPhone())
                .address(shippingInfo.getAddress())
                .receiveName(shippingInfo.getReceiveName())
                .paymentMethod(paymentMethod)
                .receiveMethod(receiveMethod)
                .status(OrderStatus.PENDING.value())
                .totalPrice(totalPrice)
                .note(note)
                .orderItems(orderItems)
                .build();

        return order;
    }

}
