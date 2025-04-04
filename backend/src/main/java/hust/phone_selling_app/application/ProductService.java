package hust.phone_selling_app.application;

import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.product.Product;

public interface ProductService {

    public Product createProduct(Product product, Image image);

    public Product updateProduct(Product product, Image image);

    public void deleteProduct(Product product);

}
