package hust.phone_selling_app.core.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.BrandEntity;
import hust.phone_selling_app.core.port.IBrandPort;
import hust.phone_selling_app.core.port.IImagePort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GetBrandUsecase {

    private final IBrandPort brandPort;
    private final IImagePort imagePort;

    public BrandEntity findById(Long id) {

        log.info("Find brand with id: {}", id);

        BrandEntity brand = brandPort.findById(id);

        if (brand.getImage() != null) {
            brand.setImage(imagePort.findById(brand.getImage().getId()));
        }

        return brand;

    }

    public List<BrandEntity> findAll() {

        log.info("Find all brands");

        List<BrandEntity> brands = brandPort.findAll();
        brands.forEach(brand -> {
            if (brand.getImage() != null) {
                brand.setImage(imagePort.findById(brand.getImage().getId()));
            }
        });

        return brands;

    }

}
