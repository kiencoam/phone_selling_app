package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import hust.phone_selling_app.infrastructure.persistence.model.OrderModel;

public interface OrderRepositoryJpa extends JpaRepository<OrderModel, Long>, JpaSpecificationExecutor<OrderModel> {

    List<OrderModel> findByUserId(Long userId);

    List<OrderModel> findByUserIdAndStatus(Long userId, String status);

}
