package hust.phone_selling_app.application;

import hust.phone_selling_app.domain.brand.Brand;
import hust.phone_selling_app.domain.image.Image;

public interface BrandService {

    Brand createBrand(Brand brand, Image image);

    void deleteBrand(Brand brand);

}
