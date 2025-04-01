package hust.phone_selling_app.application.impl;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.application.AttributeService;
import hust.phone_selling_app.domain.attribute.Attribute;
import hust.phone_selling_app.domain.attribute.AttributeRepository;
import hust.phone_selling_app.domain.category.Category;
import hust.phone_selling_app.domain.category.CategoryRepository;
import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AttributeServiceImpl implements AttributeService {

    private final AttributeRepository attributeRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Attribute createAttribute(Attribute attribute) {
        Category category = categoryRepository.findById(attribute.getCategoryId());
        if (category == null) {
            log.error("Category with id {} not found", attribute.getCategoryId());
            throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
        }

        // Tim Product ung voi categoryId, them moi ProductAttribute ung voi tung
        // Product
        Attribute createdAttribute = attributeRepository.save(attribute);
        return createdAttribute;
    }

    @Override
    public void deleteAttribute(Attribute attribute) {
        // Xoa ProductAttribute co attributeId
        attributeRepository.delete(attribute.getId());
    }

}
