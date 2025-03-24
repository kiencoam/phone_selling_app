package hust.phone_selling_app.core.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.dto.request.CreateBrandRequestDto;
import hust.phone_selling_app.core.domain.dto.request.UpdateBrandRequestDto;
import hust.phone_selling_app.core.domain.entity.BrandEntity;
import hust.phone_selling_app.core.service.IBrandService;
import hust.phone_selling_app.core.usecase.CreateBrandUsecase;
import hust.phone_selling_app.core.usecase.DeleteBrandUsecase;
import hust.phone_selling_app.core.usecase.GetBrandUsecase;
import hust.phone_selling_app.core.usecase.UpdateBrandUsecase;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IBrandServiceImpl implements IBrandService {

    private final CreateBrandUsecase createBrandUsecase;
    private final UpdateBrandUsecase updateBrandUsecase;
    private final DeleteBrandUsecase deleteBrandUsecase;
    private final GetBrandUsecase getBrandUsecase;

    @Override
    public BrandEntity save(CreateBrandRequestDto request) {
        return createBrandUsecase.create(request);
    }

    @Override
    public BrandEntity update(UpdateBrandRequestDto request) {
        return updateBrandUsecase.update(request);
    }

    @Override
    public void delete(Long id) {
        deleteBrandUsecase.delete(id);
    }

    @Override
    public BrandEntity findById(Long id) {
        return getBrandUsecase.findById(id);
    }

    @Override
    public List<BrandEntity> findAll() {
        return getBrandUsecase.findAll();
    }

}
