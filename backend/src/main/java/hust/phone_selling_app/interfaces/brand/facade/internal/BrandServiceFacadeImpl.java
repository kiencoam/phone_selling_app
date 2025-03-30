package hust.phone_selling_app.interfaces.brand.facade.internal;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.application.BrandService;
import hust.phone_selling_app.domain.brand.Brand;
import hust.phone_selling_app.domain.brand.BrandRepository;
import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.image.ImageRepository;
import hust.phone_selling_app.interfaces.brand.facade.BrandServiceFacade;
import hust.phone_selling_app.interfaces.brand.facade.dto.BrandDTO;
import hust.phone_selling_app.interfaces.brand.facade.internal.assembler.BrandAssembler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrandServiceFacadeImpl implements BrandServiceFacade {

    private final BrandService brandService;
    private final BrandRepository brandRepository;
    private final ImageRepository imageRepository;

    @Override
    public BrandDTO save(Brand brand, Image image) {
        Brand savedBrand = brandService.createBrand(brand, image);
        BrandDTO brandDTO = BrandAssembler.toDTO(savedBrand);
        brandDTO.setImage(Image.builder().id(savedBrand.getImageId()).build());
        return brandDTO;
    }

    @Override
    public void delete(Long id) {
        Brand brand = brandRepository.findById(id);
        if (brand == null) {
            log.error("Brand not found with id: {}", id);
            throw new AppException(ErrorCode.BRAND_NOT_FOUND);
        }

        brandService.deleteBrand(brand);
    }

    @Override
    public BrandDTO findById(Long id) {
        Brand brand = brandRepository.findById(id);

        if (brand == null) {
            log.error("Brand not found with id: {}", id);
            throw new AppException(ErrorCode.BRAND_NOT_FOUND);
        }

        BrandDTO brandDTO = BrandAssembler.toDTO(brand);

        Image image = imageRepository.findById(brand.getImageId());
        if (image == null) {
            log.error("Image not found for brand with id: {}", id);
            brandDTO.setImage(null);
        } else {
            brandDTO.setImage(image);
        }

        return brandDTO;
    }

    @Override
    public List<BrandDTO> findAll() {
        List<Brand> brands = brandRepository.findAll();
        List<BrandDTO> brandDTOs = brands.stream()
                .map(brand -> {
                    BrandDTO brandDTO = BrandAssembler.toDTO(brand);
                    Image image = imageRepository.findById(brand.getImageId());
                    if (image == null) {
                        log.error("Image not found for brand with id: {}", brand.getId());
                        brandDTO.setImage(null);
                    } else {
                        brandDTO.setImage(image);
                    }
                    return brandDTO;
                })
                .toList();

        return brandDTOs;
    }

    @Override
    public List<BrandDTO> findByName(String name) {
        List<Brand> brands = brandRepository.search(name);
        List<BrandDTO> brandDTOs = brands.stream()
                .map(brand -> {
                    BrandDTO brandDTO = BrandAssembler.toDTO(brand);
                    Image image = imageRepository.findById(brand.getImageId());
                    if (image == null) {
                        log.error("Image not found for brand with id: {}", brand.getId());
                        brandDTO.setImage(null);
                    } else {
                        brandDTO.setImage(image);
                    }
                    return brandDTO;
                })
                .toList();

        return brandDTOs;
    }

}
