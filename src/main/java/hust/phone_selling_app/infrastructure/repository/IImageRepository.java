package hust.phone_selling_app.infrastructure.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import hust.phone_selling_app.infrastructure.repository.model.ImageModel;

public interface IImageRepository extends MongoRepository<ImageModel, String> {

    List<ImageModel> findByVariantId(Long variantId);

    void deleteByVariantId(Long variantId);

}
