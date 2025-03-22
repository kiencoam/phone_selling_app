package hust.phone_selling_app.core.port;

import java.util.List;

import hust.phone_selling_app.core.domain.entity.ImageEntity;

public interface IImagePort {

    ImageEntity save(ImageEntity image);

    void deleteById(String id);

    ImageEntity findById(String id);

    List<ImageEntity> findByVariantId(Long variantId);

    void deleteByVariantId(Long variantId);

}
