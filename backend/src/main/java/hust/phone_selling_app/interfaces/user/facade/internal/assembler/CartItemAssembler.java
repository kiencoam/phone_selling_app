package hust.phone_selling_app.interfaces.user.facade.internal.assembler;

import hust.phone_selling_app.domain.user.CartItem;
import hust.phone_selling_app.interfaces.user.facade.dto.CartItemDTO;

public class CartItemAssembler {

    public static CartItemDTO toDTO(CartItem cartItem) {
        if (cartItem == null) {
            return null;
        }
        return CartItemDTO.builder()
                .id(cartItem.getId())
                .quantity(cartItem.getQuantity())
                .build();
    }

}
