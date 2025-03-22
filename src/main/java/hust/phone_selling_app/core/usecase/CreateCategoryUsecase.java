package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.dto.request.CreateCategoryRequestDto;
import hust.phone_selling_app.core.domain.entity.CategoryEntity;
import hust.phone_selling_app.core.domain.mapper.CategoryMapper;
import hust.phone_selling_app.core.port.ICategoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CreateCategoryUsecase {

    private final ICategoryPort categoryPort;

    public CategoryEntity create(CreateCategoryRequestDto request) {
        log.info("Create new category with name: {}", request.getName());
        CategoryEntity category = CategoryMapper.INSTANCE.toEntity(request);
        return categoryPort.save(category);
    }

}
