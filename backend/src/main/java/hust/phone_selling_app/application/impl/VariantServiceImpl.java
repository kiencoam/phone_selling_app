package hust.phone_selling_app.application.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.application.VariantService;
import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.image.ImageRepository;
import hust.phone_selling_app.domain.user.UserRepository;
import hust.phone_selling_app.domain.variant.Variant;
import hust.phone_selling_app.domain.variant.VariantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class VariantServiceImpl implements VariantService {

    private final VariantRepository variantRepository;
    private final ImageRepository imageRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Variant createVariant(Variant variant, List<Image> images) {
        Variant createdVariant = variantRepository.create(variant);
        images.forEach(image -> {
            Image newImage = Image.builder()
                    .base64(image.getBase64())
                    .isPrimary(image.getIsPrimary())
                    .build();
            imageRepository.save(newImage, createdVariant.getId());
        });
        return createdVariant;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Variant updateVariant(Variant variant, List<Image> images) {
        Variant updatedVariant = variantRepository.update(variant);
        images.forEach(image -> {
            if (image.getId() == null) {
                imageRepository.save(image, updatedVariant.getId());
            }
        });
        return updatedVariant;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteVariant(Variant variant) {
        userRepository.removeCartItemByVariantId(variant.getId());
        imageRepository.deleteByVariantId(variant.getId());
        variantRepository.delete(variant.getId());
    }

}
