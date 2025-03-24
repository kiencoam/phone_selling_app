package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.dto.request.UpdateCategoryRequestDto;
import hust.phone_selling_app.core.domain.entity.CategoryEntity;
import hust.phone_selling_app.core.domain.mapper.CategoryMapper;
import hust.phone_selling_app.core.port.ICategoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UpdateCategoryUsecase {

    private final ICategoryPort categoryPort;

    public CategoryEntity update(UpdateCategoryRequestDto request) {
        log.info("Update category with id: {}", request.getId());
        CategoryEntity category = CategoryMapper.INSTANCE.toEntity(request);
        return categoryPort.save(category);
    }

}
