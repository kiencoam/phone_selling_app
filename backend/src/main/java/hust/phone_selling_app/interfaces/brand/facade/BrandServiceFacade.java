package hust.phone_selling_app.interfaces.brand.facade;

import java.util.List;

import hust.phone_selling_app.domain.brand.Brand;
import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.interfaces.brand.facade.dto.BrandDTO;

public interface BrandServiceFacade {

    public BrandDTO save(Brand brand, Image image);

    public void delete(Long id);

    public BrandDTO findById(Long id);

    public List<BrandDTO> findAll();

    public List<BrandDTO> findByName(String name);

}
