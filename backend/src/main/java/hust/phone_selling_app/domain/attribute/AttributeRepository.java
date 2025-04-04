package hust.phone_selling_app.domain.attribute;

import java.util.List;

public interface AttributeRepository {

    public Attribute save(Attribute attribute);

    public void delete(Long id);

    public Attribute findById(Long id);

    public List<Attribute> findAllByCategoryId(Long categoryId);

}
