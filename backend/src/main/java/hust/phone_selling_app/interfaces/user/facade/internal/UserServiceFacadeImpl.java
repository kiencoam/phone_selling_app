package hust.phone_selling_app.interfaces.user.facade.internal;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.role.Role;
import hust.phone_selling_app.domain.role.RoleRepository;
import hust.phone_selling_app.domain.user.CartItem;
import hust.phone_selling_app.domain.user.ShippingInfo;
import hust.phone_selling_app.domain.user.User;
import hust.phone_selling_app.domain.user.UserRepository;
import hust.phone_selling_app.domain.variant.Variant;
import hust.phone_selling_app.domain.variant.VariantRepository;
import hust.phone_selling_app.interfaces.product.facade.ProductServiceFacade;
import hust.phone_selling_app.interfaces.product.facade.dto.CatalogItemDTO;
import hust.phone_selling_app.interfaces.user.facade.UserServiceFacade;
import hust.phone_selling_app.interfaces.user.facade.dto.CartItemDTO;
import hust.phone_selling_app.interfaces.user.facade.dto.UserDTO;
import hust.phone_selling_app.interfaces.user.facade.dto.VariantDTO;
import hust.phone_selling_app.interfaces.user.facade.internal.assembler.CartItemAssembler;
import hust.phone_selling_app.interfaces.user.facade.internal.assembler.UserAssembler;
import hust.phone_selling_app.interfaces.user.facade.internal.assembler.VariantAssembler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceFacadeImpl implements UserServiceFacade {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final VariantRepository variantRepository;
    private final ProductServiceFacade productServiceFacade;

    @Override
    public UserDTO save(User user) {
        if (user.getId() == null) {
            User existingUser = userRepository.findByEmail(user.getEmail());
            if (existingUser != null) {
                log.error("User with email {} already exists", user.getEmail());
                throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
            }
        }

        user = userRepository.save(user);
        UserDTO userDTO = UserAssembler.toDTO(user);

        Role role = roleRepository.findById(user.getRoleId());
        userDTO.setRole(role);

        return userDTO;
    }

    @Override
    public Page<UserDTO> search(Long roleId, String keyword, int page, int size) {
        Pageable pageable = Pageable.ofSize(size).withPage(page - 1);

        Page<User> userPage = userRepository.findByRoleAndKeyword(roleId, keyword, pageable);

        return userPage.map(UserAssembler::toDTO);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<ShippingInfo> getShippingInfos(Long userId) {
        User user = userRepository.findById(userId);
        if (user == null) {
            log.error("User not found with id: {}", userId);
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        return user.getShippingInfos();
    }

    @Override
    public ShippingInfo addShippingInfo(Long userId, ShippingInfo shippingInfo) {
        return userRepository.addShippingInfo(userId, shippingInfo);
    }

    @Override
    public ShippingInfo updateShippingInfo(Long userId, ShippingInfo shippingInfo) {
        return userRepository.updateShippingInfo(userId, shippingInfo);
    }

    @Override
    public void removeShippingInfo(Long userId, Long shippingInfoId) {
        userRepository.removeShippingInfo(userId, shippingInfoId);
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id);
        if (user == null) {
            log.error("User not found with id: {}", id);
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        UserDTO userDTO = UserAssembler.toDTO(user);

        Role role = roleRepository.findById(user.getRoleId());
        userDTO.setRole(role);

        return userDTO;
    }

    @Override
    public List<CartItemDTO> getCartItems(Long userId) {
        List<CartItem> cartItems = userRepository.findCartItemsByUserId(userId);
        List<CartItemDTO> cartItemDTOs = cartItems.stream()
                .map(cartItem -> {
                    CartItemDTO cartItemDTO = CartItemAssembler.toDTO(cartItem);

                    // Set variant DTO
                    Variant variant = variantRepository.findById(cartItem.getVariantId());
                    if (variant == null) {
                        log.error("Variant not found with id: {}", cartItem.getVariantId());
                        throw new AppException(ErrorCode.VARIANT_NOT_FOUND);
                    }
                    VariantDTO variantDTO = VariantAssembler.toDTO(variant);
                    cartItemDTO.setVariant(variantDTO);

                    // Set Catalog item DTO
                    if (variant.getProductId() == null) {
                        log.error("Product not found with id: {}", variant.getProductId());
                        throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
                    }
                    CatalogItemDTO catalogItemDTO = productServiceFacade.findCatalogItemById(variant.getProductId());
                    cartItemDTO.setCatalogItem(catalogItemDTO);

                    return cartItemDTO;
                })
                .toList();
        return cartItemDTOs;
    }

    @Override
    public CartItemDTO addToCart(Long userId, Long variantId, int quantity) {
        CartItem cartItem = userRepository.addCartItem(userId, variantId, quantity);
        return CartItemAssembler.toDTO(cartItem);
    }

    @Override
    public CartItemDTO updateCartItem(Long userId, Long variantId, int quantity) {
        CartItem cartItem = userRepository.updateCartItem(userId, variantId, quantity);
        return CartItemAssembler.toDTO(cartItem);
    }

    @Override
    public void removeFromCart(Long userId, Long variantId) {
        userRepository.removeCartItem(userId, variantId);
    }

}
