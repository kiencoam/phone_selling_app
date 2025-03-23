package hust.phone_selling_app.core.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.AttributeEntity;
import hust.phone_selling_app.core.port.IAttributePort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GetAttributeUsecase {

    private final IAttributePort attributePort;

    public AttributeEntity findById(Long id) {
        log.info("[GetAttributeUsecase] Get attribute with id {}", id);

        return attributePort.findById(id);
    }

    public List<AttributeEntity> findByProductId(Long productId) {
        log.info("[GetAttributeUsecase] Get attributes by product id {}", productId);

        return attributePort.findByProductId(productId);
    }

}
