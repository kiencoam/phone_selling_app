package hust.phone_selling_app.application.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.application.ProductService;
import hust.phone_selling_app.application.VariantService;
import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.image.ImageRepository;
import hust.phone_selling_app.domain.product.Product;
import hust.phone_selling_app.domain.product.ProductRepository;
import hust.phone_selling_app.domain.variant.Variant;
import hust.phone_selling_app.domain.variant.VariantRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;
    private final VariantRepository variantRepository;
    private final VariantService variantService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Product createProduct(Product product, Image image) {
        Image newImage = Image.builder()
                .base64(image.getBase64())
                .build();
        Image savedImage = imageRepository.save(newImage);
        product.setImageId(savedImage.getId());
        return productRepository.create(product);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Product updateProduct(Product product, Image image) {
        if (image.getId() == null) {
            image = imageRepository.save(image);
        }
        product.setImageId(image.getId());
        return productRepository.update(product);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteProduct(Product product) {
        // Xoa variants
        List<Variant> variants = variantRepository.findByProductId(product.getId());
        for (Variant variant : variants) {
            variantService.deleteVariant(variant);
        }

        // Xoa image
        imageRepository.delete(product.getImageId());

        productRepository.delete(product.getId());
    }

}
