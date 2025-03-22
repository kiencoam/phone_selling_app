package hust.phone_selling_app.core.service;

import java.util.List;

import hust.phone_selling_app.core.domain.dto.request.CreateBrandRequestDto;
import hust.phone_selling_app.core.domain.dto.request.UpdateBrandRequestDto;
import hust.phone_selling_app.core.domain.entity.BrandEntity;

public interface IBrandService {

    BrandEntity save(CreateBrandRequestDto request);

    BrandEntity update(UpdateBrandRequestDto request);

    void delete(Long id);

    BrandEntity findById(Long id);

    List<BrandEntity> findAll();

}
