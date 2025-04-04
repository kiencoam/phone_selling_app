package hust.phone_selling_app.application.impl;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.application.ProductService;
import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.image.ImageRepository;
import hust.phone_selling_app.domain.product.Product;
import hust.phone_selling_app.domain.product.ProductRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;

    @Override
    public Product createProduct(Product product, Image image) {
        Image savedImage = imageRepository.save(image);
        product.setImageId(savedImage.getId());
        return productRepository.create(product);
    }

    @Override
    public Product updateProduct(Product product, Image image) {
        if (image.getId() == null) {
            image = imageRepository.save(image);
        }
        product.setImageId(image.getId());
        return productRepository.update(product);
    }

    @Override
    public void deleteProduct(Product product) {
        // Xoa variants
        imageRepository.delete(product.getImageId());
        productRepository.delete(product.getId());
    }

}
