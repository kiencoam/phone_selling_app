package hust.phone_selling_app.application;

import hust.phone_selling_app.domain.attribute.Attribute;

public interface AttributeService {

    public Attribute createAttribute(Attribute attribute);

    public void deleteAttribute(Attribute attribute);

}
