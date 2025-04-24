package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.brand.Brand;
import hust.phone_selling_app.infrastructure.persistence.model.BrandModel;

public class BrandAssembler {

    public static Brand toDomain(BrandModel brandModel) {
        if (brandModel == null) {
            return null;
        }
        return Brand.builder()
                .id(brandModel.getId())
                .name(brandModel.getName())
                .imageId(brandModel.getImageId())
                .build();
    }

    public static BrandModel toModel(Brand brand) {
        if (brand == null) {
            return null;
        }
        return BrandModel.builder()
                .id(brand.getId())
                .name(brand.getName())
                .imageId(brand.getImageId())
                .build();
    }

}
