package hust.phone_selling_app.infrastructure.persistence;

import java.util.List;

import org.springframework.stereotype.Component;

import hust.phone_selling_app.domain.brand.Brand;
import hust.phone_selling_app.domain.brand.BrandRepository;
import hust.phone_selling_app.infrastructure.persistence.assembler.BrandAssembler;
import hust.phone_selling_app.infrastructure.persistence.jpa.BrandRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.model.BrandModel;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BrandRepositoryImpl implements BrandRepository {

    private final BrandRepositoryJpa brandRepository;

    @Override
    public Brand save(Brand brand) {
        BrandModel brandModel = BrandAssembler.toModel(brand);
        return BrandAssembler.toDomain(brandRepository.save(brandModel));
    }

    @Override
    public void delete(Long brandId) {
        brandRepository.deleteById(brandId);
    }

    @Override
    public Brand findById(Long brandId) {
        BrandModel brandModel = brandRepository.findById(brandId).orElse(null);
        return BrandAssembler.toDomain(brandModel);
    }

    @Override
    public List<Brand> findAll() {
        List<BrandModel> brandModels = brandRepository.findAll();
        return brandModels.stream()
                .map(BrandAssembler::toDomain)
                .toList();
    }

    @Override
    public List<Brand> search(String keyword) {
        List<BrandModel> brandModels = brandRepository.findByNameContaining(keyword);
        return brandModels.stream()
                .map(BrandAssembler::toDomain)
                .toList();
    }

}
