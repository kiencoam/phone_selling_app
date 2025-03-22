package hust.phone_selling_app.core.port;

import java.util.List;

import hust.phone_selling_app.core.domain.entity.BrandEntity;

public interface IBrandPort {

    public BrandEntity save(BrandEntity brandEntity);

    public BrandEntity update(BrandEntity brandEntity);

    public BrandEntity findById(Long id);

    public List<BrandEntity> findAll();

    public void deleteById(Long id);

}
