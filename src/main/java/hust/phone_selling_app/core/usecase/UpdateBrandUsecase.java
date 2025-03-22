package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.core.domain.dto.request.UpdateBrandRequestDto;
import hust.phone_selling_app.core.domain.entity.BrandEntity;
import hust.phone_selling_app.core.domain.entity.ImageEntity;
import hust.phone_selling_app.core.domain.mapper.BrandMapper;
import hust.phone_selling_app.core.port.IBrandPort;
import hust.phone_selling_app.core.port.IImagePort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UpdateBrandUsecase {

    private final IBrandPort brandPort;
    private final IImagePort imagePort;

    @Transactional(rollbackFor = Exception.class)
    public BrandEntity update(UpdateBrandRequestDto request) {
        log.info("Update brand with id: {}", request.getId());

        if (request.getImage() != null && request.getImage().getId() == null) {
            ImageEntity image = ImageEntity.builder().base64(request.getImage().getBase64()).build();
            image = imagePort.save(request.getImage());
            image.setBase64(null);

            request.setImage(image);
        }

        BrandEntity brand = BrandMapper.INSTANCE.toEntity(request);

        return brandPort.update(brand);

    }

}
