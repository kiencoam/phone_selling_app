package hust.phone_selling_app.infrastructure.persistence;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import hust.phone_selling_app.domain.productline.ProductLine;
import hust.phone_selling_app.domain.productline.ProductLineRepository;
import hust.phone_selling_app.domain.shared.LineSearchCriteria;
import hust.phone_selling_app.infrastructure.persistence.assembler.ProductLineAssembler;
import hust.phone_selling_app.infrastructure.persistence.jpa.ProductLineRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.model.ProductLineModel;
import hust.phone_selling_app.infrastructure.persistence.specification.ProductLineSpecification;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProductLineRepositoryImpl implements ProductLineRepository {

    private final ProductLineRepositoryJpa productLineRepository;

    @Override
    public ProductLine save(ProductLine productLine) {
        ProductLineModel productLineModel = ProductLineAssembler.toModel(productLine);
        return ProductLineAssembler.toDomain(productLineRepository.save(productLineModel));
    }

    @Override
    public void delete(Long id) {
        productLineRepository.deleteById(id);
    }

    @Override
    public ProductLine findById(Long id) {
        ProductLineModel productLineModel = productLineRepository.findById(id).orElse(null);
        return ProductLineAssembler.toDomain(productLineModel);
    }

    @Override
    public Page<ProductLine> search(LineSearchCriteria criteria) {
        Pageable pageable = criteria.toPageable();

        Page<ProductLineModel> productLineModels = productLineRepository
                .findAll(ProductLineSpecification.satisfySearchCriteria(criteria), pageable);

        return productLineModels.map(ProductLineAssembler::toDomain);
    }

    @Override
    public ProductLine findByCode(String code) {
        ProductLineModel productLineModel = productLineRepository.findByCode(code).orElse(null);
        return ProductLineAssembler.toDomain(productLineModel);
    }

    @Override
    public List<ProductLine> findByCategoryId(Long categoryId) {
        List<ProductLineModel> productLineModels = productLineRepository.findByCategoryId(categoryId);
        return productLineModels.stream().map(ProductLineAssembler::toDomain).toList();
    }

    @Override
    public List<ProductLine> findByBrandId(Long brandId) {
        List<ProductLineModel> productLineModels = productLineRepository.findByBrandId(brandId);
        return productLineModels.stream().map(ProductLineAssembler::toDomain).toList();
    }

}
