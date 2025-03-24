package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.InventoryEntity;
import hust.phone_selling_app.core.port.IInventoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GetInventoryUsecase {

    private final IInventoryPort inventoryPort;

    public InventoryEntity findByVariantId(Long variantId) {
        log.info("[GetInventoryUsecase] Find inventory by variant id: {}", variantId);

        return inventoryPort.findByVariantId(variantId);
    }

}
