package hust.phone_selling_app.core.service.impl;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.service.IImageService;
import hust.phone_selling_app.core.usecase.DeleteImageUsecase;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IImageServiceImpl implements IImageService {

    private final DeleteImageUsecase deleteImageUsecase;

    @Override
    public void deleteById(String id) {
        deleteImageUsecase.deleteById(id);
    }

    @Override
    public void deleteByVariantId(Long variantId) {
        deleteImageUsecase.deleteByVariantId(variantId);
    }

}
