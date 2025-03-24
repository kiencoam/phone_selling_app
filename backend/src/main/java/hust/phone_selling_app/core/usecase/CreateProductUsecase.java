package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.core.domain.dto.request.CreateProductRequestDto;
import hust.phone_selling_app.core.domain.entity.ImageEntity;
import hust.phone_selling_app.core.domain.entity.ProductEntity;
import hust.phone_selling_app.core.domain.mapper.ProductMapper;
import hust.phone_selling_app.core.port.IProductPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CreateProductUsecase {

    private final IProductPort productPort;
    private final CreateImageUsecase createImageUsecase;
    private final CreateAttributeUsecase createAttributeUsecase;
    private final CreatePromotionUsecase createPromotionUsecase;

    @Transactional(rollbackFor = Exception.class)
    public ProductEntity create(CreateProductRequestDto request) {
        log.info("[CreateProductUsecase] Create new product with name: {}", request.getName());

        if (request.getImage() != null) {
            ImageEntity image = createImageUsecase.create(request.getImage().getBase64());
            image.setBase64(null);

            request.setImage(image);
        }

        ProductEntity product = ProductMapper.INSTANCE.toEntity(request);
        product = productPort.save(product);

        Long productId = product.getId();
        product.setAttributes(
                request.getAttributes().stream()
                        .map(attribute -> {
                            attribute.setProductId(productId);
                            return createAttributeUsecase.create(attribute);
                        })
                        .toList());

        product.setPromotions(
                request.getPromotionIds().stream()
                        .map(promotionId -> createPromotionUsecase.apply(promotionId, productId))
                        .toList());

        return product;
    }

}
