package hust.phone_selling_app.application.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.application.BrandService;
import hust.phone_selling_app.domain.brand.Brand;
import hust.phone_selling_app.domain.brand.BrandRepository;
import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.image.ImageRepository;
import hust.phone_selling_app.domain.productline.ProductLine;
import hust.phone_selling_app.domain.productline.ProductLineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final ImageRepository imageRepository;
    private final ProductLineRepository productLineRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Brand createBrand(Brand brand, Image image) {

        if (image.getId() == null) {
            image = imageRepository.save(image);
        }

        brand.setImageId(image.getId());
        return brandRepository.save(brand);

    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteBrand(Brand brand) {
        // Kiem tra xem con product line nao thuoc brand khong
        List<ProductLine> productLines = productLineRepository.findByBrandId(brand.getId());
        if (!productLines.isEmpty()) {
            log.error("Cannot delete brand {} because it has product lines", brand.getId());
            throw new AppException(ErrorCode.BRAND_HAS_PRODUCT_LINE);
        }

        imageRepository.delete(brand.getImageId());
        brandRepository.delete(brand.getId());
    }
}
