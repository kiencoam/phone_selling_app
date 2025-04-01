package hust.phone_selling_app.infrastructure.persistence;

import java.util.List;

import org.springframework.stereotype.Component;

import hust.phone_selling_app.domain.attribute.Attribute;
import hust.phone_selling_app.domain.attribute.AttributeRepository;
import hust.phone_selling_app.infrastructure.persistence.assembler.AttributeAssembler;
import hust.phone_selling_app.infrastructure.persistence.jpa.AttributeRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.model.AttributeModel;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AttributeRepositoryImpl implements AttributeRepository {

    private final AttributeRepositoryJpa attributeRepository;

    @Override
    public Attribute save(Attribute attribute) {
        AttributeModel attributeModel = AttributeAssembler.toModel(attribute);
        return AttributeAssembler.toDomain(attributeRepository.save(attributeModel));
    }

    @Override
    public void delete(Long id) {
        attributeRepository.deleteById(id);
    }

    @Override
    public Attribute findById(Long id) {
        AttributeModel attributeModel = attributeRepository.findById(id).orElse(null);
        return AttributeAssembler.toDomain(attributeModel);
    }

    @Override
    public List<Attribute> findAllByCategoryId(Long categoryId) {
        List<AttributeModel> attributeModels = attributeRepository.findByCategoryId(categoryId);
        return attributeModels.stream()
                .map(AttributeAssembler::toDomain)
                .toList();
    }

}
