package hust.phone_selling_app.core.domain.constant;

public enum ProductStatus {
    ACTIVE("ACTIVE"),
    INACTIVE("INACTIVE"),
    ;

    private String value;

    ProductStatus(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }
}
