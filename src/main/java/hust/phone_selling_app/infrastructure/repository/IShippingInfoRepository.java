package hust.phone_selling_app.infrastructure.repository;

import java.util.List;

import hust.phone_selling_app.infrastructure.repository.model.ShippingInfoModel;

public interface IShippingInfoRepository extends IBaseRepository<ShippingInfoModel> {

    List<ShippingInfoModel> findByCustomerId(Long customerId);

    void deleteByCustomerId(Long customerId);

}
