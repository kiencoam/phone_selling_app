package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.user.CartItem;
import hust.phone_selling_app.infrastructure.persistence.model.CartItemModel;

public class CartItemAssembler {

    public static CartItemModel toModel(CartItem cartItem) {
        if (cartItem == null) {
            return null;
        }
        return CartItemModel.builder()
                .id(cartItem.getId())
                .variantId(cartItem.getVariantId())
                .quantity(cartItem.getQuantity())
                .build();
    }

    public static CartItem toDomain(CartItemModel cartItemModel) {
        if (cartItemModel == null) {
            return null;
        }
        return CartItem.builder()
                .id(cartItemModel.getId())
                .variantId(cartItemModel.getVariantId())
                .quantity(cartItemModel.getQuantity())
                .build();
    }

}
