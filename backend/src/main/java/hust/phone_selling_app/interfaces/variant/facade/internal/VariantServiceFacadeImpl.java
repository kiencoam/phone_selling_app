package hust.phone_selling_app.interfaces.variant.facade.internal;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.application.VariantService;
import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.image.ImageRepository;
import hust.phone_selling_app.domain.variant.Inventory;
import hust.phone_selling_app.domain.variant.Variant;
import hust.phone_selling_app.domain.variant.VariantRepository;
import hust.phone_selling_app.interfaces.variant.facade.VariantServiceFacade;
import hust.phone_selling_app.interfaces.variant.facade.dto.VariantDTO;
import hust.phone_selling_app.interfaces.variant.facade.internal.assembler.VariantAssembler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class VariantServiceFacadeImpl implements VariantServiceFacade {

    private final VariantService variantService;
    private final VariantRepository variantRepository;
    private final ImageRepository imageRepository;

    @Override
    public VariantDTO create(Variant variant, List<Image> images) {
        Variant createdVariant = variantService.createVariant(variant, images);
        return VariantAssembler.toDTO(createdVariant);
    }

    @Override
    public VariantDTO update(Variant variant, List<Image> images) {
        Variant existingVariant = variantRepository.findById(variant.getId());
        if (existingVariant == null) {
            log.error("Variant with id {} not found", variant.getId());
            throw new AppException(ErrorCode.VARIANT_NOT_FOUND);
        }

        existingVariant.setCode(variant.getCode());
        existingVariant.setColor(variant.getColor());

        Variant updatedVariant = variantService.updateVariant(existingVariant, images);
        return VariantAssembler.toDTO(updatedVariant);
    }

    @Override
    public VariantDTO findById(Long id) {
        Variant existingVariant = variantRepository.findById(id);
        if (existingVariant == null) {
            log.error("Variant with id {} not found", id);
            throw new AppException(ErrorCode.VARIANT_NOT_FOUND);
        }
        VariantDTO variant = VariantAssembler.toDTO(existingVariant);
        List<Image> images = imageRepository.findByVariantId(id);
        variant.setImages(images);
        return variant;
    }

    @Override
    public List<VariantDTO> findByProductId(Long productId) {
        List<Variant> variants = variantRepository.findByProductId(productId);
        List<VariantDTO> variantDTOs = variants.stream()
                .map(VariantAssembler::toDTO)
                .toList();
        return variantDTOs;
    }

    @Override
    public Inventory updateAvailable(Long variantId, Long available) {
        Variant existingVariant = variantRepository.findById(variantId);
        if (existingVariant == null) {
            log.error("Variant with id {} not found", variantId);
            throw new AppException(ErrorCode.VARIANT_NOT_FOUND);
        }
        Inventory updatedInventory = variantRepository.updateAvailable(variantId, available);
        return updatedInventory;
    }

    @Override
    public void delete(Long id) {
        Variant existingVariant = variantRepository.findById(id);
        if (existingVariant == null) {
            log.error("Variant with id {} not found", id);
            throw new AppException(ErrorCode.VARIANT_NOT_FOUND);
        }
        variantService.deleteVariant(existingVariant);
    }

}
