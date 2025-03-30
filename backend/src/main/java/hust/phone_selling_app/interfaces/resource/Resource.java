package hust.phone_selling_app.interfaces.resource;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Resource<T> {
    private Object meta;
    private T data;

    public Resource(T data) {
        this.meta = new MetaResource(HttpStatus.OK.value(), "Success");
        this.data = data;
    }

    public Resource(Integer code, String message) {
        this.meta = new MetaResource(code, message);
        this.data = null;
    }
}
