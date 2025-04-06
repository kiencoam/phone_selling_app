package hust.phone_selling_app.domain.variant;

import java.util.List;

public interface VariantRepository {

    public Variant create(Variant variant);

    public Variant update(Variant variant);

    public void delete(Long id);

    public Variant findById(Long id);

    public List<Variant> findByProductId(Long productId);

    public Inventory updateAvailable(Long variantId, Long available);

    public Inventory sell(Long variantId, Long quantity);

    public Inventory returnItem(Long variantId, Long quantity);

}
