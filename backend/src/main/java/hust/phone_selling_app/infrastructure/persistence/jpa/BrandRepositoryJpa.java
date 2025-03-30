package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import hust.phone_selling_app.infrastructure.persistence.model.BrandModel;

public interface BrandRepositoryJpa extends JpaRepository<BrandModel, Long> {

    List<BrandModel> findByNameContaining(String name);

}
