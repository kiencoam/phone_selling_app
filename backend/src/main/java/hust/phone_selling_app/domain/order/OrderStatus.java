package hust.phone_selling_app.domain.order;

public enum OrderStatus {

    PENDING("PENDING", "Đang chờ xử lý"),
    CONFIRMED("CONFIRMED", "Đã xác nhận"),
    DELIVERING("DELIVERING", "Đang giao hàng"),
    RECEIVED("RECEIVED", "Đã nhận hàng"),
    CANCELED("CANCELED", "Đã hủy"),
    ;

    private final String value;
    private final String description;

    OrderStatus(String value, String description) {
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
