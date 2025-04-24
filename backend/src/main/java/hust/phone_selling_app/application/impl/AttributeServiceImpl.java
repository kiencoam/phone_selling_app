package hust.phone_selling_app.application.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.application.AttributeService;
import hust.phone_selling_app.domain.attribute.Attribute;
import hust.phone_selling_app.domain.attribute.AttributeRepository;
import hust.phone_selling_app.domain.category.Category;
import hust.phone_selling_app.domain.category.CategoryRepository;
import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.product.Product;
import hust.phone_selling_app.domain.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AttributeServiceImpl implements AttributeService {

    private final AttributeRepository attributeRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Attribute createAttribute(Attribute attribute) {
        Category category = categoryRepository.findById(attribute.getCategoryId());
        if (category == null) {
            log.error("Category with id {} not found", attribute.getCategoryId());
            throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
        }

        Attribute createdAttribute = attributeRepository.save(attribute);

        // Tim Product ung voi categoryId, them moi ProductAttribute ung voi tung
        // Product
        List<Product> products = productRepository.findByCategoryId(attribute.getCategoryId());
        for (Product product : products) {
            productRepository.createProductAttribute(createdAttribute.getId(), product.getId());
        }

        return createdAttribute;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteAttribute(Attribute attribute) {
        // Xoa ProductAttribute co attributeId
        productRepository.deleteProductAttributeByAttributeId(attribute.getId());

        attributeRepository.delete(attribute.getId());
    }

}
