package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.variant.Inventory;
import hust.phone_selling_app.infrastructure.persistence.model.InventoryModel;

public class InventoryAssembler {

    public static Inventory toDomain(InventoryModel model) {
        if (model == null) {
            return null;
        }
        return Inventory.builder()
                .id(model.getId())
                .available(model.getAvailable())
                .sold(model.getSold())
                .build();
    }

    public static InventoryModel toModel(Inventory domain) {
        if (domain == null) {
            return null;
        }
        return InventoryModel.builder()
                .id(domain.getId())
                .available(domain.getAvailable())
                .sold(domain.getSold())
                .build();
    }

}
