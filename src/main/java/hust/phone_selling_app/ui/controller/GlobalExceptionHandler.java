package hust.phone_selling_app.ui.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import hust.phone_selling_app.core.domain.constant.ErrorCode;
import hust.phone_selling_app.core.exception.AppException;
import hust.phone_selling_app.ui.resource.MetaResource;
import hust.phone_selling_app.ui.resource.Resource;
import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(value = AppException.class)
    public ResponseEntity<Resource<?>> handleAppException(AppException e) {
        ErrorCode errorCode = e.getErrorCode();
        log.error("Error code: {}, message: {}", errorCode.getCode(), errorCode.getMessage());

        return ResponseEntity
                .status(errorCode.getHttpStatusCode())
                .body(Resource.builder()
                        .meta(new MetaResource(errorCode.getCode(), errorCode.getMessage()))
                        .build());
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<Resource<?>> handleRuntimeException(Exception e) {
        log.error("Unexpected error: {}", e.getMessage(), e);
        ErrorCode errorCode = ErrorCode.UNCATEGORIZED_EXCEPTION;

        return ResponseEntity
                .status(errorCode.getHttpStatusCode())
                .body(Resource.builder()
                        .meta(new MetaResource(errorCode.getCode(), errorCode.getMessage()))
                        .build());
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<Resource<?>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error("Method argument not valid: {}", e.getMessage());
        ErrorCode errorCode = ErrorCode.INVALID_REQUEST;

        String message = e.getMessage();
        int start = message.lastIndexOf("[") + 1;
        int end = message.lastIndexOf("]") - 1;
        message = message.substring(start, end);

        return ResponseEntity
                .status(errorCode.getHttpStatusCode())
                .body(Resource.builder()
                        .meta(new MetaResource(errorCode.getCode(), message))
                        .build());
    }

}
