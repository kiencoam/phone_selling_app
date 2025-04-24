package hust.phone_selling_app.interfaces.order.facade;

import java.util.List;

import org.springframework.data.domain.Page;

import hust.phone_selling_app.domain.shared.OrderSearchCriteria;
import hust.phone_selling_app.interfaces.order.facade.dto.OrderDTO;

public interface OrderServiceFacade {

        public OrderDTO createOrderFromVariant(Long variantId,
                        Integer quantity,
                        Long userId,
                        Long shippingInfoId,
                        String paymentMethod,
                        String receiveMethod,
                        String note);

        public OrderDTO createOrderFromCart(Long userId,
                        Long shippingInfoId,
                        String paymentMethod,
                        String receiveMethod,
                        String note);

        public void confirmOrder(Long orderId);

        public void cancelOrder(Long orderId);

        public void deliverOrder(Long orderId);

        public void receiveOrder(Long orderId);

        public OrderDTO getOrderById(Long orderId);

        public OrderDTO getOrderByIdAndUserId(Long orderId, Long userId);

        public List<OrderDTO> getOrdersByUserId(Long userId);

        public void cancelCustomerOrder(Long orderId, Long userId);

        public List<OrderDTO> getOrdersByUserIdAndStatus(Long userId, String status);

        public Page<OrderDTO> searchOrders(OrderSearchCriteria criteria);

}
