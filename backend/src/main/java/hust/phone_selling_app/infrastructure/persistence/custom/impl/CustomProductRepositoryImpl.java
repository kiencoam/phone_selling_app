package hust.phone_selling_app.infrastructure.persistence.custom.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import hust.phone_selling_app.domain.shared.ProductSearchCriteria;
import hust.phone_selling_app.infrastructure.persistence.custom.CustomProductRepository;
import hust.phone_selling_app.infrastructure.persistence.model.ProductModel;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

@Repository
public class CustomProductRepositoryImpl implements CustomProductRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<ProductModel> search(ProductSearchCriteria criteria) {
        String bodySql = createBodySql(criteria);

        String searchSql = "select p.*" + bodySql + " limit " + criteria.getSize() + " offset "
                + criteria.getPage() * criteria.getSize();

        String countSql = "select count(*)" + bodySql;

        Query searchQuery = entityManager.createNativeQuery(searchSql, ProductModel.class);
        Query countQuery = entityManager.createNativeQuery(countSql);

        List<ProductModel> products = searchQuery.getResultList();

        Integer total;
        try {
            total = ((Number) countQuery.getSingleResult()).intValue();
        } catch (Exception e) {
            total = 0;
        }

        return new PageImpl<>(products, PageRequest.of(criteria.getPage(), criteria.getSize()), total);
    }

    @Override
    public List<ProductModel> findByCategoryId(Long categoryId) {
        String sql = "select p.*" + createBodySql(ProductSearchCriteria.builder().categoryId(categoryId).build());
        Query query = entityManager.createNativeQuery(sql, ProductModel.class);
        List<ProductModel> products = query.getResultList();
        return products;
    }

    private String createBodySql(ProductSearchCriteria criteria) {

        // Join bang
        StringBuilder bodySqlBuilder = new StringBuilder(
                " from products p join product_lines pl on p.product_line_id = pl.id");

        if (criteria.getCategoryId() != null) {
            bodySqlBuilder.append(" join categories c on pl.category_id = c.id");
        }
        if (criteria.getBrandId() != null) {
            bodySqlBuilder.append(" join brands b on pl.brand_id = b.id");
        }

        bodySqlBuilder.append(" where 1=1");

        // Tim kiem
        if (StringUtils.hasText(criteria.getKeyword())) {
            bodySqlBuilder.append(" and (p.name like '%" + criteria.getKeyword() + "%' or p.code like '%"
                    + criteria.getKeyword() + "%')");
        }

        if (criteria.getCategoryId() != null) {
            bodySqlBuilder.append(" and c.id = " + criteria.getCategoryId());
        }
        if (criteria.getBrandId() != null) {
            bodySqlBuilder.append(" and b.id = " + criteria.getBrandId());
        }
        if (criteria.getPriceFrom() != null) {
            bodySqlBuilder.append(" and p.base_price >= " + criteria.getPriceFrom());
        }
        if (criteria.getPriceTo() != null) {
            bodySqlBuilder.append(" and p.base_price <= " + criteria.getPriceTo());
        }

        if (criteria.getRatingFrom() != null) {
            bodySqlBuilder.append(" and p.rating >= " + criteria.getRatingFrom());
        }

        // Sap xep
        if (criteria.getSortBy() != null) {
            if (criteria.getSortBy().equals("price")) {
                bodySqlBuilder.append(" order by p.base_price " + criteria.getSortDir());
            } else if (criteria.getSortBy().equals("createdAt")) {
                bodySqlBuilder.append(" order by p.created_at " + criteria.getSortDir());
            } else if (criteria.getSortBy().equals("rating")) {
                bodySqlBuilder.append(" order by p.rating " + criteria.getSortDir());
            }
        }

        return bodySqlBuilder.toString();

    }

}
