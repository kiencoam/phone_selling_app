package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.infrastructure.persistence.model.ImageModel;

public class ImageAssembler {

    public static Image toDomain(ImageModel imageModel) {
        if (imageModel == null) {
            return null;
        }
        return Image.builder()
                .id(imageModel.getId())
                .base64(imageModel.getBase64())
                .isPrimary(imageModel.getIsPrimary())
                .build();
    }

    public static ImageModel toModel(Image image) {
        if (image == null) {
            return null;
        }

        return ImageModel.builder()
                .id(image.getId())
                .base64(image.getBase64())
                .isPrimary(image.getIsPrimary())
                .build();
    }

}
