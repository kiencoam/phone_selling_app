package hust.phone_selling_app.infrastructure.repository.adapter;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.ImageEntity;
import hust.phone_selling_app.core.port.IImagePort;
import hust.phone_selling_app.infrastructure.repository.IImageRepository;
import hust.phone_selling_app.infrastructure.repository.mapper.ImageMapper;
import hust.phone_selling_app.infrastructure.repository.model.ImageModel;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageAdapter implements IImagePort {

    private final IImageRepository imageRepository;

    @Override
    public ImageEntity save(ImageEntity image) {
        ImageModel imageModel = ImageMapper.INSTANCE.toModel(image);
        imageModel = imageRepository.save(imageModel);
        return ImageMapper.INSTANCE.toEntity(imageModel);
    }

    @Override
    public void deleteById(String id) {
        imageRepository.deleteById(id);
    }

    @Override
    public ImageEntity findById(String id) {
        ImageModel imageModel = imageRepository.findById(id).orElse(null);
        return ImageMapper.INSTANCE.toEntity(imageModel);
    }

    @Override
    public List<ImageEntity> findByVariantId(Long variantId) {
        List<ImageModel> models = imageRepository.findByVariantId(variantId);
        return models.stream().map(ImageMapper.INSTANCE::toEntity).toList();
    }

    @Override
    public void deleteByVariantId(Long variantId) {
        imageRepository.deleteByVariantId(variantId);
    }

}
