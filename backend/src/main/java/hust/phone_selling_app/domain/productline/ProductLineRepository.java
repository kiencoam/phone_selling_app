package hust.phone_selling_app.domain.productline;

import org.springframework.data.domain.Page;

import hust.phone_selling_app.domain.shared.SearchCriteria;

public interface ProductLineRepository {

    public ProductLine save(ProductLine productLine);

    public void delete(Long id);

    public ProductLine findById(Long id);

    public ProductLine findByCode(String code);

    public Page<ProductLine> search(SearchCriteria criteria);

}
