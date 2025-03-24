package hust.phone_selling_app.core.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.CategoryEntity;
import hust.phone_selling_app.core.port.ICategoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GetCategoryUsecase {

    private final ICategoryPort categoryPort;

    public List<CategoryEntity> findAll() {
        log.info("Get all categories");
        return categoryPort.findAll();
    }

    public CategoryEntity findById(Long id) {
        log.info("Get category with id: {}", id);
        return categoryPort.findById(id);
    }

}
