package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.port.ICategoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeleteCategoryUsecase {

    private final ICategoryPort categoryPort;

    public void delete(Long id) {
        log.info("Delete category with id: {}", id);
        categoryPort.deleteById(id);
    }

}
