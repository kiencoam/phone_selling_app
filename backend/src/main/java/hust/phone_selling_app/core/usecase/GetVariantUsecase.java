package hust.phone_selling_app.core.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.VariantEntity;
import hust.phone_selling_app.core.port.IVariantPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GetVariantUsecase {

    private final IVariantPort variantPort;
    private final GetInventoryUsecase getInventoryUsecase;
    private final GetImageUsecase getImageUsecase;

    public VariantEntity findById(Long id) {
        log.info("[GetVariantUsecase] Find variant by id: {}", id);

        VariantEntity variant = variantPort.findById(id);

        variant.setInventory(getInventoryUsecase.findByVariantId(id));
        variant.setImages(getImageUsecase.findByVariantId(id));

        return variant;
    }

    public List<VariantEntity> findByProductId(Long productId) {
        log.info("[GetVariantUsecase] Find variants by product id: {}", productId);

        List<VariantEntity> variants = variantPort.findByProductId(productId);

        variants.forEach(variant -> {
            variant.setInventory(getInventoryUsecase.findByVariantId(variant.getId()));
        });

        return variants;
    }

}
