package hust.phone_selling_app.domain.order;

import java.util.List;

import org.springframework.data.domain.Page;

import hust.phone_selling_app.domain.shared.OrderSearchCriteria;

public interface OrderRepository {

    public Order save(Order order);

    public void confirmOrder(Order order);

    public void deliverOrder(Order order);

    public void cancelOrder(Order order);

    public void receiveOrder(Order order);

    public Page<Order> search(OrderSearchCriteria criteria);

    public Order findById(Long id);

    public List<Order> findByUserId(Long userId);

    public List<Order> findByUserIdAndStatus(Long userId, String status);

}
