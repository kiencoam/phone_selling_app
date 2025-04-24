package hust.phone_selling_app.interfaces.image.web;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.interfaces.image.facade.ImageServiceFacade;
import hust.phone_selling_app.interfaces.resource.Resource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/image")
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(name = "API Quản lý ảnh", description = "Phân quyền: STAFF")
public class ImageController {

    private final ImageServiceFacade imageServiceFacade;

    @Operation(summary = "Xóa ảnh")
    @DeleteMapping("/{id}")
    public ResponseEntity<Resource<?>> delete(String id) {
        log.info("Delte image with id: {}", id);

        imageServiceFacade.delete(id);
        return ResponseEntity.ok(new Resource<>(null));
    }

}
