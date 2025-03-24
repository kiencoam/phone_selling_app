package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.port.IAttributePort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeleteAttributeUsecase {

    private final IAttributePort attributePort;

    public void delete(Long id) {
        log.info("[DeleteAttributeUsecase] Delete attribute with id {}", id);

        attributePort.delete(id);
    }

}
