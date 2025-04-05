package hust.phone_selling_app.application.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.application.ProductLineService;
import hust.phone_selling_app.application.ProductService;
import hust.phone_selling_app.domain.product.Product;
import hust.phone_selling_app.domain.product.ProductRepository;
import hust.phone_selling_app.domain.productline.ProductLine;
import hust.phone_selling_app.domain.productline.ProductLineRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductLineServiceImpl implements ProductLineService {

    private final ProductLineRepository productLineRepository;
    private final ProductRepository productRepository;
    private final ProductService productService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteProductLine(ProductLine productLine) {
        // Xoa nhung thanh phan lien quan
        // Product
        List<Product> products = productRepository.findByProductLineId(productLine.getId());
        for (Product product : products) {
            productService.deleteProduct(product);
        }

        productLineRepository.delete(productLine.getId());
    }

}
