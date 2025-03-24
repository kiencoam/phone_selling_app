package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.core.domain.dto.request.UpdateProductRequestDto;
import hust.phone_selling_app.core.domain.entity.ImageEntity;
import hust.phone_selling_app.core.domain.entity.ProductEntity;
import hust.phone_selling_app.core.domain.entity.ProductLineEntity;
import hust.phone_selling_app.core.domain.mapper.ProductMapper;
import hust.phone_selling_app.core.port.IProductLinePort;
import hust.phone_selling_app.core.port.IProductPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UpdateProductUsecase {

    private final IProductPort productPort;
    private final IProductLinePort productLinePort;
    private final CreateImageUsecase createImageUsecase;
    private final CreateAttributeUsecase createAttributeUsecase;
    private final UpdateAttributeUsecase updateAttributeUsecase;
    private final CreatePromotionUsecase createPromotionUsecase;

    @Transactional(rollbackFor = Exception.class)
    public ProductEntity update(UpdateProductRequestDto request) {
        log.info("[UpdateProductUsecase] Update product with id: {}", request.getId());

        if (request.getImage() != null && request.getImage().getId() == null) {
            ImageEntity image = createImageUsecase.create(request.getImage().getBase64());
            image.setBase64(null);

            request.setImage(image);
        }

        ProductEntity product = ProductMapper.INSTANCE.toEntity(request);

        ProductLineEntity productLine = productLinePort.findByProductId(request.getId());
        product.setProductLine(productLine);

        product = productPort.save(product);

        Long productId = product.getId();
        product.setAttributes(
                request.getAttributes().stream()
                        .map(attribute -> {
                            attribute.setProductId(productId);
                            if (attribute.getId() == null) {
                                return createAttributeUsecase.create(attribute);
                            } else {
                                return updateAttributeUsecase.update(attribute);
                            }
                        })
                        .toList());

        product.setPromotions(
                request.getPromotionIds().stream()
                        .map(promotionId -> createPromotionUsecase.apply(promotionId, productId))
                        .toList());

        return product;
    }

    @Transactional(rollbackFor = Exception.class)
    public ProductEntity updateStatus(Long id, String newStatus) {
        log.info("[UpdateProductUsecase] Update product status with id: {}", id);

        ProductEntity product = productPort.findById(id);
        product.setStatus(newStatus);

        // Chuyen tat ca trang thai cua Variant ve INACTIVE neu trang thai moi cua
        // Product la INACTIVE

        return productPort.save(product);
    }

}
