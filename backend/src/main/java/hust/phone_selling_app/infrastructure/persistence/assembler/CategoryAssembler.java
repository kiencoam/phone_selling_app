package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.category.Category;
import hust.phone_selling_app.infrastructure.persistence.model.CategoryModel;

public class CategoryAssembler {

    public static Category toDomain(CategoryModel categoryModel) {
        if (categoryModel == null) {
            return null;
        }
        return Category.builder()
                .id(categoryModel.getId())
                .name(categoryModel.getName())
                .build();
    }

    public static CategoryModel toModel(Category category) {
        if (category == null) {
            return null;
        }
        return CategoryModel.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }

}
