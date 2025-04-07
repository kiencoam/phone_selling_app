package hust.phone_selling_app.domain.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(100001, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    SUCCESS(0, "Success", HttpStatus.OK),
    ROLE_EXISTED(100002, "Role is already existed", HttpStatus.BAD_REQUEST),
    ROLE_NOT_FOUND(100003, "Role not found", HttpStatus.NOT_FOUND),
    USER_NAME_EXISTED(100006, "User name is already existed", HttpStatus.BAD_REQUEST),
    USER_EMAIL_EXISTED(100007, "email is already existed", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(100008, "User not found", HttpStatus.NOT_FOUND),
    GENERATE_TOKEN_FAILED(100009, "Generate token failed", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_TOKEN(100010, "Invalid token", HttpStatus.UNAUTHORIZED),
    TOKEN_NOT_FOUND(100011, "Token not found", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(100012, "User name or password wrong", HttpStatus.UNAUTHORIZED),
    INVALID_REQUEST(100013, "Invalid request", HttpStatus.BAD_REQUEST),
    INCORRECT_PASSWORD(100014, "Incorrect password", HttpStatus.BAD_REQUEST),
    SHIPPING_INFO_NOT_FOUND(100015, "Shipping info is not found", HttpStatus.NOT_FOUND),
    OPTIMISTIC_LOCKING_FAILURE(100016, "Conflict detected, please try again", HttpStatus.CONFLICT),
    NOT_ENOUGH_AVAILABLE(100017, "Not enough available", HttpStatus.BAD_REQUEST),
    BRAND_NOT_FOUND(100018, "Brand not found", HttpStatus.NOT_FOUND),
    PRODUCT_NOT_FOUND(100019, "Product not found", HttpStatus.NOT_FOUND),
    IMAGE_NOT_FOUND(100020, "Image not found", HttpStatus.INTERNAL_SERVER_ERROR),
    CATEGORY_NOT_FOUND(100021, "Category not found", HttpStatus.NOT_FOUND),
    USER_ALREADY_EXISTS(100022, "User already exists", HttpStatus.BAD_REQUEST),
    PRODUCT_LINE_ALREADY_EXISTS(100023, "Product line already exists", HttpStatus.BAD_REQUEST),
    PRODUCT_LINE_NOT_FOUND(100024, "Product line not found", HttpStatus.NOT_FOUND),
    INVALID_SEARCH_CRITERIA(100025, "Invalid search criteria", HttpStatus.BAD_REQUEST),
    PROMOTION_NOT_FOUND(100026, "Promotion not found", HttpStatus.NOT_FOUND),
    ATTRIBUTE_NOT_FOUND(100027, "Attribute not found", HttpStatus.NOT_FOUND),
    ATTRIBUTE_VALUE_NOT_FOUND(100028, "Attribute value not found", HttpStatus.NOT_FOUND),
    VARIANT_NOT_FOUND(100029, "Variant not found", HttpStatus.NOT_FOUND),
    BRAND_HAS_PRODUCT_LINE(100030, "Brand has product line", HttpStatus.BAD_REQUEST),
    CATEGORY_HAS_PRODUCT_LINE(100031, "Category has product line", HttpStatus.BAD_REQUEST),
    CART_ITEM_NOT_FOUND(100032, "Cart item not found", HttpStatus.NOT_FOUND),
    CART_EMPTY(100033, "Cart is empty", HttpStatus.BAD_REQUEST),
    ORDER_STATUS_NOT_VALID(100034, "Order status is not valid", HttpStatus.BAD_REQUEST),
    ORDER_NOT_FOUND(100035, "Order not found", HttpStatus.NOT_FOUND),
    REVIEW_PERMISSION_NOT_FOUND(100036, "Review permission not found", HttpStatus.NOT_FOUND),
    ;

    ErrorCode(int code, String message, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode httpStatusCode;
}
