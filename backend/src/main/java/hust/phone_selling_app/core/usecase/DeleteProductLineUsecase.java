package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.port.IProductLinePort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeleteProductLineUsecase {

    private final IProductLinePort productLinePort;

    public void delete(Long id) {

        log.info("[DeleteProductLineUsecase] Delete product line with id: {}", id);

        productLinePort.delete(id);
        ;

    }

}
