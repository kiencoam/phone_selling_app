package hust.phone_selling_app.interfaces.productline.facade.internal;

import org.springframework.data.domain.Page;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.stereotype.Service;

import hust.phone_selling_app.application.ProductLineService;
import hust.phone_selling_app.domain.brand.Brand;
import hust.phone_selling_app.domain.brand.BrandRepository;
import hust.phone_selling_app.domain.category.Category;
import hust.phone_selling_app.domain.category.CategoryRepository;
import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.productline.ProductLine;
import hust.phone_selling_app.domain.productline.ProductLineRepository;
import hust.phone_selling_app.domain.shared.LineSearchCriteria;
import hust.phone_selling_app.interfaces.productline.facade.ProductLineServiceFacade;
import hust.phone_selling_app.interfaces.productline.facade.dto.ProductLineDTO;
import hust.phone_selling_app.interfaces.productline.facade.internal.assembler.ProductLineAssembler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductLineServiceFacadeImpl implements ProductLineServiceFacade {

    private final ProductLineService productLineService;
    private final ProductLineRepository productLineRepository;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ProductLineDTO create(ProductLine productLine) {
        ProductLine existingProductLine = productLineRepository.findByCode(productLine.getCode());
        if (existingProductLine != null) {
            log.error("Product line with code {} already exists", productLine.getCode());
            throw new AppException(ErrorCode.PRODUCT_LINE_ALREADY_EXISTS);
        }

        Brand brand = brandRepository.findById(productLine.getBrandId());
        if (brand == null) {
            log.error("Brand with id {} not found", productLine.getBrandId());
            throw new AppException(ErrorCode.BRAND_NOT_FOUND);
        }

        Category category = categoryRepository.findById(productLine.getCategoryId());
        if (category == null) {
            log.error("Category with id {} not found", productLine.getCategoryId());
            throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
        }

        ProductLine savedProductLine = productLineRepository.save(productLine);
        return ProductLineAssembler.toDTO(savedProductLine);
    }

    @Override
    public ProductLineDTO update(ProductLine productLine) {
        ProductLine existingProductLine = productLineRepository.findById(productLine.getId());
        if (existingProductLine == null) {
            log.error("Product line with id {} not found", productLine.getId());
            throw new AppException(ErrorCode.PRODUCT_LINE_NOT_FOUND);
        }

        if (!existingProductLine.getCode().equals(productLine.getCode())) {
            ProductLine productLineWithSameCode = productLineRepository.findByCode(productLine.getCode());
            if (productLineWithSameCode != null) {
                log.error("Product line with code {} already exists", productLine.getCode());
                throw new AppException(ErrorCode.PRODUCT_LINE_ALREADY_EXISTS);
            }
        }

        Brand brand = brandRepository.findById(productLine.getBrandId());
        if (brand == null) {
            log.error("Brand with id {} not found", productLine.getBrandId());
            throw new AppException(ErrorCode.BRAND_NOT_FOUND);
        }

        Category category = categoryRepository.findById(productLine.getCategoryId());
        if (category == null) {
            log.error("Category with id {} not found", productLine.getCategoryId());
            throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
        }

        ProductLine updatedProductLine = productLineRepository.save(productLine);
        return ProductLineAssembler.toDTO(updatedProductLine);
    }

    @Override
    public void delete(Long id) {
        ProductLine existingProductLine = productLineRepository.findById(id);
        if (existingProductLine == null) {
            log.error("Product line with id {} not found", id);
            throw new AppException(ErrorCode.PRODUCT_LINE_NOT_FOUND);
        }

        productLineService.deleteProductLine(existingProductLine);
    }

    @Override
    public ProductLineDTO findById(Long id) {
        ProductLine productLine = productLineRepository.findById(id);
        if (productLine == null) {
            log.error("Product line with id {} not found", id);
            throw new AppException(ErrorCode.PRODUCT_LINE_NOT_FOUND);
        }

        ProductLineDTO dto = ProductLineAssembler.toDTO(productLine);

        Brand brand = brandRepository.findById(productLine.getBrandId());
        Category category = categoryRepository.findById(productLine.getCategoryId());
        dto.setBrand(brand);
        dto.setCategory(category);

        return dto;
    }

    @Override
    public Page<ProductLineDTO> search(LineSearchCriteria searchCriteria) {
        Page<ProductLine> productLines;

        try {
            productLines = productLineRepository.search(searchCriteria);
        } catch (PropertyReferenceException e) {
            log.error("Error searching product lines: {}", e.getMessage());
            throw new AppException(ErrorCode.INVALID_SEARCH_CRITERIA);
        }

        return productLines.map(productLine -> {
            ProductLineDTO dto = ProductLineAssembler.toDTO(productLine);
            Brand brand = brandRepository.findById(productLine.getBrandId());
            Category category = categoryRepository.findById(productLine.getCategoryId());
            dto.setBrand(brand);
            dto.setCategory(category);
            return dto;
        });
    }

}
