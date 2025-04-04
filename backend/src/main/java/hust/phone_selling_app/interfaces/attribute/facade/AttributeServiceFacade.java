package hust.phone_selling_app.interfaces.attribute.facade;

import java.util.List;

import hust.phone_selling_app.domain.attribute.Attribute;

public interface AttributeServiceFacade {

    public Attribute create(Attribute attribute);

    public Attribute update(Attribute attribute);

    public void delete(Long id);

    public Attribute findById(Long id);

    public List<Attribute> findAllByCategoryId(Long categoryId);

}
