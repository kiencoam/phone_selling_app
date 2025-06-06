package hust.phone_selling_app.interfaces.order.web;

import hust.phone_selling_app.domain.order.PaymentMethod;
import hust.phone_selling_app.domain.order.ReceiveMethod;
import hust.phone_selling_app.interfaces.utils.ValueOfEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FromCartOrderCreationForm {

    @NotNull(message = "Shipping Info ID cannot be null")
    private Long shippingInfoId;

    @NotNull(message = "Payment Method cannot be null")
    @ValueOfEnum(enumClass = PaymentMethod.class)
    private String paymentMethod;

    @NotNull(message = "Receive Method cannot be null")
    @ValueOfEnum(enumClass = ReceiveMethod.class)
    private String receiveMethod;

    private String note;

}
