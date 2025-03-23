package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.AttributeEntity;
import hust.phone_selling_app.core.port.IAttributePort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UpdateAttributeUsecase {

    private final IAttributePort attributePort;

    public final AttributeEntity update(AttributeEntity attribute) {
        log.info("[UpdateAttributeUsecase] Update attribute with id {}", attribute.getId());

        return attributePort.save(attribute);
    }

}
