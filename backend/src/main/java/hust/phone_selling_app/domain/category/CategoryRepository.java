package hust.phone_selling_app.domain.category;

import java.util.List;

public interface CategoryRepository {

    public Category save(Category category);

    public void delete(Long categoryId);

    public Category findById(Long categoryId);

    public List<Category> search(String keyword);

    public List<Category> findAll();

}
