package hust.phone_selling_app.application.impl;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.application.ProductLineService;
import hust.phone_selling_app.domain.productline.ProductLine;
import hust.phone_selling_app.domain.productline.ProductLineRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductLineServiceImpl implements ProductLineService {

    private final ProductLineRepository productLineRepository;

    @Override
    public void deleteProductLine(ProductLine productLine) {
        // Xoa nhung thanh phan lien quan
        productLineRepository.delete(productLine.getId());
    }

}
