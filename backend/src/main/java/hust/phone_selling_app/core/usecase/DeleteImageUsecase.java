package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.port.IImagePort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeleteImageUsecase {

    private final IImagePort imagePort;

    public void deleteById(String id) {
        imagePort.deleteById(id);
    }

    public void deleteByVariantId(Long variantId) {
        imagePort.deleteByVariantId(variantId);
    }

}
