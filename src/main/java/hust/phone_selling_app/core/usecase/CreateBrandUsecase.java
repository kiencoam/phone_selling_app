package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.core.domain.dto.request.CreateBrandRequestDto;
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
public class CreateBrandUsecase {

    private final IBrandPort brandPort;
    private final IImagePort imagePort;

    @Transactional(rollbackFor = Exception.class)
    public BrandEntity create(CreateBrandRequestDto request) {

        log.info("Create new brand with name: {}", request.getName());

        if (request.getImage() != null) {
            ImageEntity image = ImageEntity.builder().base64(request.getImage().getBase64()).build();
            image = imagePort.save(request.getImage());
            image.setBase64(null);

            request.setImage(image);
        }

        BrandEntity brand = BrandMapper.INSTANCE.toEntity(request);

        return brandPort.save(brand);

    }

}
