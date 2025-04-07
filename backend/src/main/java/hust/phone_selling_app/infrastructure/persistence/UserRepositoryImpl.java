package hust.phone_selling_app.infrastructure.persistence;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.user.CartItem;
import hust.phone_selling_app.domain.user.ShippingInfo;
import hust.phone_selling_app.domain.user.User;
import hust.phone_selling_app.domain.user.UserRepository;
import hust.phone_selling_app.infrastructure.persistence.assembler.CartItemAssembler;
import hust.phone_selling_app.infrastructure.persistence.assembler.ShippingInfoAssembler;
import hust.phone_selling_app.infrastructure.persistence.assembler.UserAssembler;
import hust.phone_selling_app.infrastructure.persistence.jpa.CartItemRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.jpa.ShippingInfoRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.jpa.UserRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.model.CartItemModel;
import hust.phone_selling_app.infrastructure.persistence.model.ShippingInfoModel;
import hust.phone_selling_app.infrastructure.persistence.model.UserModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserRepositoryImpl implements UserRepository {

    private final UserRepositoryJpa userRepository;
    private final ShippingInfoRepositoryJpa shippingInfoRepository;
    private final CartItemRepositoryJpa cartItemRepository;

    @Override
    public User findByEmail(String email) {
        UserModel userModel = userRepository.findByEmail(email).orElse(null);
        User user = UserAssembler.toDomain(userModel);

        if (user != null) {
            List<ShippingInfoModel> shippingInfoModels = shippingInfoRepository.findByUserId(user.getId());
            user.setShippingInfos(shippingInfoModels.stream()
                    .map(ShippingInfoAssembler::toDomain)
                    .toList());
        }

        return user;
    }

    @Override
    public User findById(Long id) {
        UserModel userModel = userRepository.findById(id).orElse(null);
        User user = UserAssembler.toDomain(userModel);
        return user;
    }

    @Override
    public User save(User user) {
        UserModel userModel = UserAssembler.toModel(user);
        userModel = userRepository.save(userModel);
        return UserAssembler.toDomain(userModel);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteById(Long id) {
        cartItemRepository.deleteByUserId(id);
        shippingInfoRepository.deleteByUserId(id);
        userRepository.deleteById(id);
    }

    @Override
    public Page<User> findByRoleAndKeyword(Long roleId, String keyword, Pageable pageable) {
        Page<UserModel> userModels = userRepository.findByRoleIdAndFullNameContaining(roleId, keyword, pageable);
        return userModels.map(UserAssembler::toDomain);
    }

    @Override
    public ShippingInfo findShippingInfoById(Long shippingInfoId) {
        ShippingInfoModel shippingInfoModel = shippingInfoRepository.findById(shippingInfoId).orElse(null);
        return ShippingInfoAssembler.toDomain(shippingInfoModel);
    }

    @Override
    public List<ShippingInfo> findShippingInfosByUserId(Long userId) {
        List<ShippingInfoModel> shippingInfoModels = shippingInfoRepository.findByUserId(userId);
        return shippingInfoModels.stream()
                .map(ShippingInfoAssembler::toDomain)
                .toList();
    }

    @Override
    public ShippingInfo addShippingInfo(Long userId, ShippingInfo shippingInfo) {
        ShippingInfoModel shippingInfoModel = ShippingInfoAssembler.toModel(shippingInfo);
        shippingInfoModel.setUserId(userId);
        shippingInfoModel = shippingInfoRepository.save(shippingInfoModel);
        return ShippingInfoAssembler.toDomain(shippingInfoModel);
    }

    @Override
    public ShippingInfo updateShippingInfo(Long userId, ShippingInfo shippingInfo) {
        ShippingInfoModel shippingInfoModel = shippingInfoRepository.findByIdAndUserId(shippingInfo.getId(), userId)
                .orElse(null);

        if (shippingInfoModel == null) {
            log.error("Shipping info not found for user id: {} and shipping info id: {}", userId, shippingInfo.getId());
            throw new AppException(ErrorCode.SHIPPING_INFO_NOT_FOUND);
        }

        shippingInfoModel.setPhone(shippingInfo.getPhone());
        shippingInfoModel.setAddress(shippingInfo.getAddress());
        shippingInfoModel.setReceiveName(shippingInfo.getReceiveName());
        shippingInfoModel.setUserId(userId);
        shippingInfoModel = shippingInfoRepository.save(shippingInfoModel);
        return ShippingInfoAssembler.toDomain(shippingInfoModel);
    }

    @Override
    public void removeShippingInfo(Long userId, Long shippingInfoId) {
        ShippingInfoModel shippingInfoModel = shippingInfoRepository.findByIdAndUserId(shippingInfoId, userId)
                .orElse(null);

        if (shippingInfoModel == null) {
            log.error("Shipping info not found for user id: {} and shipping info id: {}", userId, shippingInfoId);
            throw new AppException(ErrorCode.SHIPPING_INFO_NOT_FOUND);
        }

        shippingInfoRepository.deleteById(shippingInfoModel.getId());
    }

    @Override
    public CartItem addCartItem(Long userId, Long variantId, int quantity) {
        CartItemModel cartItemModel = cartItemRepository.findByUserIdAndVariantId(userId, variantId).orElse(null);
        if (cartItemModel == null) {
            cartItemModel = CartItemModel.builder()
                    .userId(userId)
                    .variantId(variantId)
                    .quantity(quantity)
                    .build();
            cartItemModel = cartItemRepository.save(cartItemModel);
        } else {
            cartItemModel.setQuantity(cartItemModel.getQuantity() + quantity);
            cartItemModel = cartItemRepository.save(cartItemModel);
        }
        return CartItemAssembler.toDomain(cartItemModel);
    }

    @Override
    public CartItem updateCartItem(Long userId, Long variantId, int quantity) {
        CartItemModel cartItemModel = cartItemRepository.findByUserIdAndVariantId(userId, variantId).orElse(null);
        if (cartItemModel == null) {
            log.error("Cart item not found for user id: {} and variant id: {}", userId, variantId);
            throw new AppException(ErrorCode.CART_ITEM_NOT_FOUND);
        }
        cartItemModel.setQuantity(quantity);
        cartItemModel = cartItemRepository.save(cartItemModel);
        return CartItemAssembler.toDomain(cartItemModel);
    }

    @Override
    public void removeCartItem(Long userId, Long variantId) {
        CartItemModel cartItemModel = cartItemRepository.findByUserIdAndVariantId(userId, variantId).orElse(null);
        if (cartItemModel == null) {
            log.error("Cart item not found for user id: {} and variant id: {}", userId, variantId);
            throw new AppException(ErrorCode.CART_ITEM_NOT_FOUND);
        }
        cartItemRepository.deleteById(cartItemModel.getId());
    }

    @Override
    public List<CartItem> findCartItemsByUserId(Long userId) {
        List<CartItemModel> cartItemModels = cartItemRepository.findByUserId(userId);
        return cartItemModels.stream()
                .map(CartItemAssembler::toDomain)
                .toList();
    }

    @Override
    public void removeCartItemsByUserId(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }

    @Override
    public void removeCartItemByVariantId(Long variantId) {
        cartItemRepository.deleteByVariantId(variantId);
    }

}
