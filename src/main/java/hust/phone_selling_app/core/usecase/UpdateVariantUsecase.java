package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.core.domain.dto.request.UpdateVariantRequestDto;
import hust.phone_selling_app.core.domain.entity.VariantEntity;
import hust.phone_selling_app.core.port.IVariantPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UpdateVariantUsecase {

    private final IVariantPort variantPort;
    private final CreateImageUsecase createImageUsecase;
    private final UpdateInventoryUsecase updateInventoryUsecase;

    @Transactional(rollbackFor = Exception.class)
    public VariantEntity update(UpdateVariantRequestDto request) {
        log.info("[UpdateVariantUsecase] Update variant with id {}", request.getId());

        VariantEntity variant = variantPort.findById(request.getId());
        variant.setColor(request.getColor());

        variant = variantPort.save(variant);

        Long variantId = variant.getId();
        variant.setImages(
                request.getImages().stream()
                        .map(image -> {
                            if (image.getId() == null) {
                                if (image.getIsPrimary() == null) {
                                    image.setIsPrimary(false);
                                }
                                image = createImageUsecase.create(image.getBase64(), variantId, image.getIsPrimary());
                                image.setBase64(null);
                                return image;
                            } else {
                                image.setBase64(null);
                                return image;
                            }
                        }).toList());

        variant.setInventory(updateInventoryUsecase.updateAvailable(variantId, request.getAvailable()));

        return variant;
    }

    public VariantEntity updateStatus(Long id, String newStatus) {
        log.info("[UpdateVariantUsecase] Update variant status with id {}", id);

        VariantEntity variant = variantPort.findById(id);

        // Kiem tra trang thai cua Product

        variant.setStatus(newStatus);

        return variantPort.save(variant);
    }

}
