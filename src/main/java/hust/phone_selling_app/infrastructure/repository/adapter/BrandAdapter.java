package hust.phone_selling_app.infrastructure.repository.adapter;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.BrandEntity;
import hust.phone_selling_app.core.port.IBrandPort;
import hust.phone_selling_app.infrastructure.repository.IBrandRepository;
import hust.phone_selling_app.infrastructure.repository.mapper.BrandMapper;
import hust.phone_selling_app.infrastructure.repository.model.BrandModel;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BrandAdapter implements IBrandPort {

    private final IBrandRepository brandRepository;

    @Override
    public BrandEntity save(BrandEntity brandEntity) {
        BrandModel model = BrandMapper.INSTANCE.toModel(brandEntity);
        return BrandMapper.INSTANCE.toEntity(brandRepository.save(model));
    }

    @Override
    public BrandEntity update(BrandEntity brandEntity) {
        BrandModel model = BrandMapper.INSTANCE.toModel(brandEntity);
        return BrandMapper.INSTANCE.toEntity(brandRepository.save(model));
    }

    @Override
    public BrandEntity findById(Long id) {
        BrandModel model = brandRepository.findById(id).orElse(null);
        return BrandMapper.INSTANCE.toEntity(model);
    }

    @Override
    public List<BrandEntity> findAll() {
        List<BrandModel> models = brandRepository.findAll();
        return models.stream().map(BrandMapper.INSTANCE::toEntity).toList();
    }

    @Override
    public void deleteById(Long id) {
        brandRepository.deleteById(id);
    }

}
