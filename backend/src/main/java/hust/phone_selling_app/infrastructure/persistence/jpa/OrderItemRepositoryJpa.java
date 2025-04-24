package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hust.phone_selling_app.infrastructure.persistence.model.OrderItemModel;

public interface OrderItemRepositoryJpa extends JpaRepository<OrderItemModel, Long> {

    List<OrderItemModel> findByOrderId(Long orderId);

}
