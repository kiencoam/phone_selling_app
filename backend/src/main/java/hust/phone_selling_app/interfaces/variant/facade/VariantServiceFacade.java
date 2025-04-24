package hust.phone_selling_app.interfaces.variant.facade;

import java.util.List;

import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.variant.Inventory;
import hust.phone_selling_app.domain.variant.Variant;
import hust.phone_selling_app.interfaces.variant.facade.dto.VariantDTO;

public interface VariantServiceFacade {

    public VariantDTO create(Variant variant, List<Image> images);

    public VariantDTO update(Variant variant, List<Image> images);

    public void delete(Long id);

    public VariantDTO findById(Long id);

    public List<VariantDTO> findByProductId(Long productId);

    public Inventory updateAvailable(Long variantId, Long available);

}
