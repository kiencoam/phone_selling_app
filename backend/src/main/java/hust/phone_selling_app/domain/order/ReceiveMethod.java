package hust.phone_selling_app.domain.order;

public enum ReceiveMethod {

    DELIVERY("DELIVERY", "Giao hàng tận nơi"),
    PICKUP("PICKUP", "Nhận hàng tại cửa hàng"),
    ;

    private final String value;
    private final String description;

    ReceiveMethod(String value, String description) {
        this.value = value;
        this.description = description;
    }

    public String value() {
        return value;
    }

    public String description() {
        return description;
    }

}
