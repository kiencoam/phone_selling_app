package hust.phone_selling_app.application.impl;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.application.BrandService;
import hust.phone_selling_app.domain.brand.Brand;
import hust.phone_selling_app.domain.brand.BrandRepository;
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
    public void deleteBrand(Brand brand) {
        imageRepository.delete(brand.getImageId());
        brandRepository.delete(brand.getId());
    }
}
