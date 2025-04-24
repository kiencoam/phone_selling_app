package hust.phone_selling_app.interfaces.category.facade;

import java.util.List;

import hust.phone_selling_app.domain.category.Category;

public interface CategoryServiceFacade {

    public Category save(Category category);

    public void delete(Long id);

    public Category findById(Long id);

    public List<Category> findAll();

    public List<Category> findByName(String name);

}
