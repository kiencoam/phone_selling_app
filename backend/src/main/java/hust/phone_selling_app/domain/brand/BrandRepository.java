package hust.phone_selling_app.domain.brand;

import java.util.List;

public interface BrandRepository {

    public Brand save(Brand brand);

    public void delete(Long brandId);

    public Brand findById(Long brandId);

    public List<Brand> findAll();

    public List<Brand> search(String keyword);

}
