package hust.phone_selling_app.interfaces.productline.facade;

import org.springframework.data.domain.Page;

import hust.phone_selling_app.domain.productline.ProductLine;
import hust.phone_selling_app.domain.shared.LineSearchCriteria;
import hust.phone_selling_app.interfaces.productline.facade.dto.ProductLineDTO;

public interface ProductLineServiceFacade {

    public ProductLineDTO create(ProductLine productLine);

    public ProductLineDTO update(ProductLine productLine);

    public void delete(Long id);

    public ProductLineDTO findById(Long id);

    public Page<ProductLineDTO> search(LineSearchCriteria searchCriteria);

}
