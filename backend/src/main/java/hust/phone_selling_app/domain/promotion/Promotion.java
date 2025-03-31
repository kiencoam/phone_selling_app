package hust.phone_selling_app.domain.promotion;

import java.time.Instant;

import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Promotion {

    private Long id;

    private String name;

    private Long value;

    private Instant startDate;

    private Instant endDate;

    private Long categoryId;

    public Promotion(Long id, String name, Long value, Instant startDate, Instant endDate, Long categoryId) {
        if (endDate.isBefore(startDate)) {
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }
        this.id = id;
        this.name = name;
        this.value = value;
        this.startDate = startDate;
        this.endDate = endDate;
        this.categoryId = categoryId;
    }

}
