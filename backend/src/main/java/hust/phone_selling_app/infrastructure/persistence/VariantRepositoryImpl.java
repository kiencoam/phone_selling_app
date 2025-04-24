package hust.phone_selling_app.infrastructure.persistence;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.variant.Inventory;
import hust.phone_selling_app.domain.variant.Variant;
import hust.phone_selling_app.domain.variant.VariantRepository;
import hust.phone_selling_app.infrastructure.persistence.assembler.InventoryAssembler;
import hust.phone_selling_app.infrastructure.persistence.assembler.VariantAssembler;
import hust.phone_selling_app.infrastructure.persistence.jpa.InventoryRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.jpa.VariantRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.model.InventoryModel;
import hust.phone_selling_app.infrastructure.persistence.model.VariantModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class VariantRepositoryImpl implements VariantRepository {

    private final VariantRepositoryJpa variantRepository;
    private final InventoryRepositoryJpa inventoryRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Variant create(Variant variant) {
        VariantModel variantModel = VariantAssembler.toModel(variant);
        variantModel = variantRepository.save(variantModel);

        InventoryModel inventoryModel = InventoryModel.builder()
                .available(variant.getInventory().getAvailable())
                .sold(0L)
                .variantId(variantModel.getId())
                .build();
        inventoryModel = inventoryRepository.save(inventoryModel);

        variant = VariantAssembler.toDomain(variantModel);
        variant.setInventory(InventoryAssembler.toDomain(inventoryModel));

        return variant;
    }

    @Override
    public Variant update(Variant variant) {
        VariantModel variantModel = VariantAssembler.toModel(variant);
        variantModel = variantRepository.save(variantModel);
        return variant;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(Long id) {
        inventoryRepository.deleteByVariantId(id);
        variantRepository.deleteById(id);
    }

    @Override
    public Variant findById(Long id) {
        VariantModel variantModel = variantRepository.findById(id).orElse(null);
        if (variantModel == null) {
            return null;
        }
        InventoryModel inventoryModel = inventoryRepository.findByVariantId(id).orElse(null);
        Variant variant = VariantAssembler.toDomain(variantModel);
        variant.setInventory(InventoryAssembler.toDomain(inventoryModel));
        return variant;
    }

    @Override
    public Inventory updateAvailable(Long variantId, Long available) {
        InventoryModel inventoryModel = inventoryRepository.findByVariantId(variantId).orElse(null);
        if (inventoryModel == null) {
            return null;
        }
        inventoryModel.setAvailable(available);
        inventoryModel = inventoryRepository.save(inventoryModel);
        return InventoryAssembler.toDomain(inventoryModel);
    }

    @Override
    public Inventory sell(Long variantId, Long quantity) {
        InventoryModel inventoryModel = inventoryRepository.findByVariantId(variantId).orElse(null);
        if (inventoryModel == null) {
            return null;
        }
        if (inventoryModel.getAvailable() < quantity) {
            log.error("Not enough available inventory for variantId: {}", variantId);
            throw new AppException(ErrorCode.NOT_ENOUGH_AVAILABLE);
        }
        inventoryModel.setAvailable(inventoryModel.getAvailable() - quantity);
        inventoryModel.setSold(inventoryModel.getSold() + quantity);
        inventoryModel = inventoryRepository.save(inventoryModel);
        return InventoryAssembler.toDomain(inventoryModel);
    }

    @Override
    public List<Variant> findByProductId(Long productId) {
        List<VariantModel> variantModels = variantRepository.findByProductId(productId);
        List<Variant> variants = variantModels.stream()
                .map(variantModel -> {
                    InventoryModel inventoryModel = inventoryRepository.findByVariantId(variantModel.getId())
                            .orElse(null);
                    Variant variant = VariantAssembler.toDomain(variantModel);
                    variant.setInventory(InventoryAssembler.toDomain(inventoryModel));
                    return variant;
                })
                .toList();
        return variants;
    }

    @Override
    public Inventory returnItem(Long variantId, Long quantity) {
        InventoryModel inventoryModel = inventoryRepository.findByVariantId(variantId).orElse(null);
        if (inventoryModel == null) {
            return null;
        }
        inventoryModel.setAvailable(inventoryModel.getAvailable() + quantity);
        inventoryModel.setSold(inventoryModel.getSold() - quantity);
        inventoryModel = inventoryRepository.save(inventoryModel);
        return InventoryAssembler.toDomain(inventoryModel);
    }

}
