package hust.phone_selling_app.infrastructure.persistence;

import java.util.List;

import org.springframework.stereotype.Component;

import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.image.ImageRepository;
import hust.phone_selling_app.infrastructure.persistence.assembler.ImageAssembler;
import hust.phone_selling_app.infrastructure.persistence.jpa.ImageRepositoryMongo;
import hust.phone_selling_app.infrastructure.persistence.model.ImageModel;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ImageRepositoryImpl implements ImageRepository {

    private final ImageRepositoryMongo imageRepository;

    @Override
    public Image save(Image image) {
        ImageModel imageModel = ImageAssembler.toModel(image);
        return ImageAssembler.toDomain(imageRepository.save(imageModel));
    }

    @Override
    public Image save(Image image, Long variantId) {
        ImageModel imageModel = ImageAssembler.toModel(image);
        imageModel.setVariantId(variantId);
        imageModel = imageRepository.save(imageModel);
        return ImageAssembler.toDomain(imageModel);
    }

    @Override
    public void delete(String imageId) {
        if (imageId != null) {
            imageRepository.deleteById(imageId);
        }
    }

    @Override
    public Image findById(String imageId) {
        ImageModel imageModel = imageRepository.findById(imageId).orElse(null);
        return ImageAssembler.toDomain(imageModel);
    }

    @Override
    public void deleteByVariantId(Long variantId) {
        imageRepository.deleteByVariantId(variantId);
    }

    @Override
    public List<Image> findByVariantId(Long variantId) {
        List<ImageModel> imageModels = imageRepository.findByVariantId(variantId);
        return imageModels.stream()
                .map(ImageAssembler::toDomain)
                .toList();
    }

}
