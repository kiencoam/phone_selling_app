package hust.phone_selling_app.interfaces.exceptionhandler;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.interfaces.resource.MetaResource;
import hust.phone_selling_app.interfaces.resource.Resource;
import jakarta.validation.ConstraintViolationException;
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

        @ExceptionHandler(value = DataIntegrityViolationException.class)
        public ResponseEntity<Resource<?>> handleDataIntegrityViolationException(DataIntegrityViolationException e) {
                log.error("Data Integrity Violation: {}", e.getMessage());
                ErrorCode errorCode = ErrorCode.INVALID_REQUEST;

                String message = "Data integrity violation";

                return ResponseEntity
                                .status(errorCode.getHttpStatusCode())
                                .body(Resource.builder()
                                                .meta(new MetaResource(errorCode.getCode(), message))
                                                .build());
        }

        @ExceptionHandler(value = ConstraintViolationException.class)
        public ResponseEntity<Resource<?>> handleConstraintViolationException(ConstraintViolationException e) {
                log.error("Constraint Violation: {}", e.getMessage());
                ErrorCode errorCode = ErrorCode.INVALID_REQUEST;

                String message = "Constraint violation";

                return ResponseEntity
                                .status(errorCode.getHttpStatusCode())
                                .body(Resource.builder()
                                                .meta(new MetaResource(errorCode.getCode(), message))
                                                .build());
        }

        @ExceptionHandler(value = HttpMessageNotReadableException.class)
        public ResponseEntity<Resource<?>> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
                log.error("Message not readable: {}", e.getMessage());
                ErrorCode errorCode = ErrorCode.INVALID_REQUEST;

                String message = e.getMessage();

                return ResponseEntity
                                .status(errorCode.getHttpStatusCode())
                                .body(Resource.builder()
                                                .meta(new MetaResource(errorCode.getCode(), message))
                                                .build());
        }

        @ExceptionHandler(value = MethodArgumentTypeMismatchException.class)
        public ResponseEntity<Resource<?>> handleMethodArgumentTypeMismatchException(
                        MethodArgumentTypeMismatchException e) {
                log.error("Method argument type mismatch: {}", e.getMessage());
                ErrorCode errorCode = ErrorCode.INVALID_REQUEST;

                String message = e.getMessage();

                return ResponseEntity
                                .status(errorCode.getHttpStatusCode())
                                .body(Resource.builder()
                                                .meta(new MetaResource(errorCode.getCode(), message))
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

}
