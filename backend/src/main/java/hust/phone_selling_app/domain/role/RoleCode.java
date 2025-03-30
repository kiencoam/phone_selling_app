package hust.phone_selling_app.domain.role;

public enum RoleCode {

    ADMIN("ADMIN", "Quản trị viên"),
    STAFF("STAFF", "Nhân viên"),
    CUSTOMER("CUSTOMER", "Khách hàng"),
    ;

    private final String code;
    private final String name;

    RoleCode(String code, String name) {
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
