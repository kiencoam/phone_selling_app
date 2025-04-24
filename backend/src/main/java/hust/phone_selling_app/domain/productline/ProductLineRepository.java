package hust.phone_selling_app.domain.productline;

import java.util.List;

import org.springframework.data.domain.Page;

import hust.phone_selling_app.domain.shared.LineSearchCriteria;

public interface ProductLineRepository {

    public ProductLine save(ProductLine productLine);

    public void delete(Long id);

    public ProductLine findById(Long id);

    public ProductLine findByCode(String code);

    List<ProductLine> findByCategoryId(Long categoryId);

    List<ProductLine> findByBrandId(Long brandId);

    public Page<ProductLine> search(LineSearchCriteria criteria);

}
