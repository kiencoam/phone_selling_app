package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hust.phone_selling_app.infrastructure.persistence.model.AttributeModel;

public interface AttributeRepositoryJpa extends JpaRepository<AttributeModel, Long> {

    public List<AttributeModel> findByCategoryId(Long categoryId);

}
