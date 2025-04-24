package hust.phone_selling_app.domain.order;

public enum PaymentMethod {

    CASH("CASH", "Thanh toán khi nhận hàng"),
    BANK_TRANSFER("BANK_TRANSFER", "Chuyển khoản ngân hàng"),
    MOMO("MOMO", "Thanh toán qua ví Momo"),
    ZALOPAY("ZALOPAY", "Thanh toán qua ZaloPay"),
    ;

    private final String value;
    private final String description;

    PaymentMethod(String value, String description) {
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
