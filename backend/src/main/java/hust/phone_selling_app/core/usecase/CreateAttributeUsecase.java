package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.AttributeEntity;
import hust.phone_selling_app.core.port.IAttributePort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CreateAttributeUsecase {

    private final IAttributePort attributePort;

    public AttributeEntity create(AttributeEntity attribute) {
        log.info("[CreateAttributeUsecase] Create new attribute with name {} for product with id {}",
                attribute.getName(),
                attribute.getProductId());

        return attributePort.save(attribute);

    }

}
