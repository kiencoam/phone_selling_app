package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.InventoryEntity;
import hust.phone_selling_app.core.port.IInventoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CreateInventoryUsecase {

    private final IInventoryPort inventoryPort;

    public InventoryEntity create(InventoryEntity inventoryEntity) {

        log.info("[CreateInventoryUsecase] Create inventory with variantId: {}", inventoryEntity.getVariantId());

        return inventoryPort.save(inventoryEntity);

    }

}
