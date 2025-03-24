package hust.phone_selling_app.core.port;

import hust.phone_selling_app.core.domain.entity.InventoryEntity;

public interface IInventoryPort {

    public InventoryEntity save(InventoryEntity inventoryEntity);

    public void delete(Long id);

    public void deleteByVariantId(Long variantId);

    public InventoryEntity findById(Long id);

    public InventoryEntity findByVariantId(Long variantId);

}
