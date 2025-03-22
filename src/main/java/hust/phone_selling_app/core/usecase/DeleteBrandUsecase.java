package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.core.domain.entity.BrandEntity;
import hust.phone_selling_app.core.port.IBrandPort;
import hust.phone_selling_app.core.port.IImagePort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeleteBrandUsecase {

    private final IBrandPort brandPort;
    private final IImagePort imagePort;

    @Transactional(rollbackFor = Exception.class)
    public void delete(Long id) {

        log.info("Delete brand with id: {}", id);

        BrandEntity brand = brandPort.findById(id);

        if (brand.getImage() != null) {
            imagePort.deleteById(brand.getImage().getId());
        }

        brandPort.deleteById(id);

    }

}
