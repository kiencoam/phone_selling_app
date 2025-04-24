package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import hust.phone_selling_app.infrastructure.persistence.model.ImageModel;

public interface ImageRepositoryMongo extends MongoRepository<ImageModel, String> {

    List<ImageModel> findByVariantId(Long variantId);

    void deleteByVariantId(Long variantId);

}
