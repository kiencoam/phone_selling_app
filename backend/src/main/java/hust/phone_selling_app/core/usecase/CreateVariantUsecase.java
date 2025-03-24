package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.core.domain.dto.request.CreateVariantRequestDto;
import hust.phone_selling_app.core.domain.entity.InventoryEntity;
import hust.phone_selling_app.core.domain.entity.VariantEntity;
import hust.phone_selling_app.core.domain.mapper.VariantMapper;
import hust.phone_selling_app.core.port.IVariantPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CreateVariantUsecase {

    private final IVariantPort variantPort;
    private final CreateInventoryUsecase createInventoryUsecase;
    private final CreateImageUsecase createImageUsecase;

    @Transactional(rollbackFor = Exception.class)
    public VariantEntity create(CreateVariantRequestDto request) {
        log.info("[CreateVariantUsecase] Create variant with color {} of product with id {}", request.getColor(),
                request.getProductId());

        VariantEntity variant = VariantMapper.INSTANCE.toEntity(request);
        variant = variantPort.save(variant);

        Long variantId = variant.getId();

        variant.setInventory(
                createInventoryUsecase.create(InventoryEntity.builder()
                        .variantId(variantId)
                        .available(request.getAvailable())
                        .sold(0L)
                        .build()));

        variant.setImages(
                request.getImages().stream()
                        .map(image -> {
                            if (image.getIsPrimary() == null) {
                                image.setIsPrimary(false);
                            }
                            image = createImageUsecase.create(image.getBase64(), variantId, image.getIsPrimary());
                            image.setBase64(null);
                            return image;
                        }).toList());

        return variant;
    }

}
