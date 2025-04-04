package hust.phone_selling_app.interfaces.attribute.facade.internal;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.application.AttributeService;
import hust.phone_selling_app.domain.attribute.Attribute;
import hust.phone_selling_app.domain.attribute.AttributeRepository;
import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.interfaces.attribute.facade.AttributeServiceFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AttributeServiceFacadeImpl implements AttributeServiceFacade {

    private final AttributeService attributeService;
    private final AttributeRepository attributeRepository;

    @Override
    public Attribute create(Attribute attribute) {
        Attribute createdAttribute = attributeService.createAttribute(attribute);
        return createdAttribute;
    }

    @Override
    public Attribute update(Attribute attribute) {
        Attribute existingAttribute = attributeRepository.findById(attribute.getId());

        if (existingAttribute == null) {
            log.error("Attribute with id {} not found", attribute.getId());
            throw new AppException(ErrorCode.ATTRIBUTE_NOT_FOUND);
        }

        existingAttribute.setName(attribute.getName());
        Attribute updatedAttribute = attributeRepository.save(existingAttribute);
        return updatedAttribute;
    }

    @Override
    public Attribute findById(Long id) {
        Attribute attribute = attributeRepository.findById(id);
        if (attribute == null) {
            log.error("Attribute with id {} not found", id);
            throw new AppException(ErrorCode.ATTRIBUTE_NOT_FOUND);
        }
        return attribute;
    }

    @Override
    public List<Attribute> findAllByCategoryId(Long categoryId) {
        List<Attribute> attributes = attributeRepository.findAllByCategoryId(categoryId);
        return attributes;
    }

    @Override
    public void delete(Long id) {
        Attribute attribute = attributeRepository.findById(id);
        if (attribute == null) {
            log.error("Attribute with id {} not found", id);
            throw new AppException(ErrorCode.ATTRIBUTE_NOT_FOUND);
        }
        attributeService.deleteAttribute(attribute);
    }

}
