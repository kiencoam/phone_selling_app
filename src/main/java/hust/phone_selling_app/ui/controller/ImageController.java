package hust.phone_selling_app.ui.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.core.service.IImageService;
import hust.phone_selling_app.ui.resource.Resource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("api/v1/images")
@RequiredArgsConstructor
@Slf4j
@Validated
public class ImageController {

    private final IImageService imageService;

    @DeleteMapping("/{id}")
    public ResponseEntity<Resource<?>> deleteById(@PathVariable String id) {
        log.info("Delete image with id: {}", id);
        imageService.deleteById(id);
        return ResponseEntity.ok(new Resource<>(null));
    }

    @DeleteMapping("/variant/{variantId}")
    public ResponseEntity<Resource<?>> deleteByVariantId(@PathVariable Long variantId) {
        log.info("Delete images belong to variants with id: {}", variantId);
        imageService.deleteByVariantId(variantId);
        return ResponseEntity.ok(new Resource<>(null));
    }

}
