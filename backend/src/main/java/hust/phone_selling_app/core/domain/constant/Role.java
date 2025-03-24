package hust.phone_selling_app.core.domain.constant;

public enum Role {
    ADMIN("ADMIN", "Quản trị viên"),
    STAFF("STAFF", "Nhân viên"),
    CUSTOMER("CUSTOMER", "Khách hàng"),
    ;

    private final String code;
    private final String name;

    Role(String code, String name) {
        this.code = code;
        this.name = name;
    }

    public String code() {
        return code;
    }

    public String name_value() {
        return name;
    }

}
