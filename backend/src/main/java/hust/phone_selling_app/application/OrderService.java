package hust.phone_selling_app.application;

import hust.phone_selling_app.domain.order.Order;

public interface OrderService {

        public Order createOrderFromVariant(Long variantId,
                        Integer quantity,
                        Long userId,
                        Long shippingInfoId,
                        String paymentMethod,
                        String receiveMethod,
                        String note);

        public Order createOrderFromCart(Long userId,
                        Long shippingInfoId,
                        String paymentMethod,
                        String receiveMethod,
                        String note);

        public void cancelOrder(Order order);

        public void receiveOrder(Order order);

}
