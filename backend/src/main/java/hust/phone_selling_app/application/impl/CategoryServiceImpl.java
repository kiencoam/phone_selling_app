package hust.phone_selling_app.application.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.application.AttributeService;
import hust.phone_selling_app.application.CategoryService;
import hust.phone_selling_app.domain.attribute.Attribute;
import hust.phone_selling_app.domain.attribute.AttributeRepository;
import hust.phone_selling_app.domain.category.Category;
import hust.phone_selling_app.domain.category.CategoryRepository;
import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.productline.ProductLine;
import hust.phone_selling_app.domain.productline.ProductLineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductLineRepository productLineRepository;
    private final AttributeRepository attributeRepository;
    private final AttributeService attributeService;

    @Override
    public void deleteCategory(Category category) {
        // Kiem tra category co con mat hang nao khong
        List<ProductLine> productLines = productLineRepository.findByCategoryId(category.getId());
        if (!productLines.isEmpty()) {
            log.error("Cannot delete category {} because it has product lines", category.getId());
            throw new AppException(ErrorCode.CATEGORY_HAS_PRODUCT_LINE);
        }

        // Xoa attribute
        List<Attribute> attributes = attributeRepository.findAllByCategoryId(category.getId());
        for (Attribute attribute : attributes) {
            attributeService.deleteAttribute(attribute);
        }

        categoryRepository.delete(category.getId());
    }

}
