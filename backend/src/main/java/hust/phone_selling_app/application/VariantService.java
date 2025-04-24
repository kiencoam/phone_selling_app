package hust.phone_selling_app.application;

import java.util.List;

import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.variant.Variant;

public interface VariantService {

    public Variant createVariant(Variant variant, List<Image> images);

    public Variant updateVariant(Variant variant, List<Image> images);

    public void deleteVariant(Variant variant);

}
