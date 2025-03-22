package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.ImageEntity;
import hust.phone_selling_app.core.port.IImagePort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CreateImageUsecase {

    private final IImagePort imagePort;

    public ImageEntity create(String base64) {
        ImageEntity image = ImageEntity.builder()
                .base64(base64)
                .build();
        return imagePort.save(image);
    }

    public ImageEntity create(String base64, Long variantId, Boolean isPrimary) {
        ImageEntity image = ImageEntity.builder()
                .base64(base64)
                .variantId(variantId)
                .isPrimary(isPrimary)
                .build();
        return imagePort.save(image);
    }

}
