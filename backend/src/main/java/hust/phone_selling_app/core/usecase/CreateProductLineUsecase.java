package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.dto.request.CreateProductLineRequestDto;
import hust.phone_selling_app.core.domain.entity.ProductLineEntity;
import hust.phone_selling_app.core.domain.mapper.ProductLineMapper;
import hust.phone_selling_app.core.port.IProductLinePort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CreateProductLineUsecase {

    private final IProductLinePort productLinePort;

    public ProductLineEntity create(CreateProductLineRequestDto request) {

        log.info("[CreateProductLineUsecase] Create new product line with name: {}", request.getName());

        ProductLineEntity productLine = ProductLineMapper.INSTANCE.toEntity(request);
        return productLinePort.save(productLine);

    }

}
