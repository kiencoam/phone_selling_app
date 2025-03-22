package hust.phone_selling_app.core.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.ImageEntity;
import hust.phone_selling_app.core.port.IImagePort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GetImageUsecase {

    private final IImagePort imagePort;

    public ImageEntity findById(String id) {
        return imagePort.findById(id);
    }

    public List<ImageEntity> findByVariantId(Long variantId) {
        return imagePort.findByVariantId(variantId);
    }

}
