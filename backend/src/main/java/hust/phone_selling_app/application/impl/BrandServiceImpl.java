package hust.phone_selling_app.application.impl;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.application.BrandService;
import hust.phone_selling_app.domain.brand.Brand;
import hust.phone_selling_app.domain.brand.BrandRepository;
import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.image.ImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final ImageRepository imageRepository;

    @Override
    public Brand createBrand(Brand brand, Image image) {

        if (image.getId() == null) {
            image = imageRepository.save(image);
        }

        brand.setImageId(image.getId());
        return brandRepository.save(brand);

    }

    @Override
    public void deleteBrand(Long id) {
        Brand brand = brandRepository.findById(id);
        if (brand == null) {
            log.warn("Brand with id {} not found", id);
            throw new AppException(ErrorCode.BRAND_NOT_FOUND);
        }
        imageRepository.delete(brand.getImageId());
        brandRepository.delete(id);
    }
}
