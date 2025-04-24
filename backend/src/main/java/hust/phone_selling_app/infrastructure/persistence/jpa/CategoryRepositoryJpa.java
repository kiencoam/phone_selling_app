package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hust.phone_selling_app.infrastructure.persistence.model.CategoryModel;

public interface CategoryRepositoryJpa extends JpaRepository<CategoryModel, Long> {

    List<CategoryModel> findByNameContaining(String name);

}
