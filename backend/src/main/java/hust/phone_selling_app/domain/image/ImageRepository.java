package hust.phone_selling_app.domain.image;

import java.util.List;

public interface ImageRepository {

    public Image save(Image image);

    public Image save(Image image, Long variantId);

    public void delete(String imageId);

    public void deleteByVariantId(Long variantId);

    public Image findById(String imageId);

    public List<Image> findByVariantId(Long variantId);

}
