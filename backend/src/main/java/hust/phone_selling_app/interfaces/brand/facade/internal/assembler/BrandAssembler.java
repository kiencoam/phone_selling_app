package hust.phone_selling_app.interfaces.brand.facade.internal.assembler;

import hust.phone_selling_app.domain.brand.Brand;
import hust.phone_selling_app.interfaces.brand.facade.dto.BrandDTO;

public class BrandAssembler {

    public static BrandDTO toDTO(Brand brand) {
        if (brand == null) {
            return null;
        }

        return BrandDTO.builder()
                .id(brand.getId())
                .name(brand.getName())
                .build();
    }

}
