package hust.phone_selling_app.core.usecase;

import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.constant.ErrorCode;
import hust.phone_selling_app.core.domain.entity.InventoryEntity;
import hust.phone_selling_app.core.exception.AppException;
import hust.phone_selling_app.core.port.IInventoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UpdateInventoryUsecase {

    private final IInventoryPort inventoryPort;

    public InventoryEntity updateAvailable(Long variantId, Long available) {
        log.info("[UpdateInventoryUsecase] Update available of variant with id {}", variantId);

        InventoryEntity inventory = inventoryPort.findByVariantId(variantId);
        inventory.setAvailable(available);

        try {
            return inventoryPort.save(inventory);
        } catch (OptimisticLockingFailureException e) {
            log.error("[UpdateInventoryUsecase] Update available of variant with id {} failed: {}", variantId,
                    e.getMessage());
            throw new AppException(ErrorCode.OPTIMISTIC_LOCKING_FAILURE);
        }

    }

    public InventoryEntity order(Long variantId, Long quantity) {
        log.info("[UpdateInventoryUsecase] Order variant with id {}", variantId);

        InventoryEntity inventory = inventoryPort.findByVariantId(variantId);
        Long available = inventory.getAvailable();
        if (available < quantity) {
            log.error("[UpdateInventoryUsecase] Order variant with id {} failed: Not enough available", variantId);
            throw new AppException(ErrorCode.NOT_ENOUGH_AVAILABLE);
        }

        inventory.setAvailable(available - quantity);
        inventory.setSold(inventory.getSold() + quantity);

        try {
            return inventoryPort.save(inventory);
        } catch (OptimisticLockingFailureException e) {
            log.error("[UpdateInventoryUsecase] Order variant with id {} failed: {}", variantId, e.getMessage());
            throw new AppException(ErrorCode.OPTIMISTIC_LOCKING_FAILURE);
        }

    }

}
