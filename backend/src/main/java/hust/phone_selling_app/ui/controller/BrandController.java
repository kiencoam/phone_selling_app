package hust.phone_selling_app.ui.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.core.domain.dto.request.CreateBrandRequestDto;
import hust.phone_selling_app.core.domain.dto.request.UpdateBrandRequestDto;
import hust.phone_selling_app.core.domain.entity.BrandEntity;
import hust.phone_selling_app.core.service.IBrandService;
import hust.phone_selling_app.ui.resource.Resource;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/brands")
@RequiredArgsConstructor
@Slf4j
@Validated
public class BrandController {

    private final IBrandService brandService;

    @PostMapping("")
    public ResponseEntity<Resource<BrandEntity>> save(@RequestBody @Valid CreateBrandRequestDto request) {
        log.info("[BrandController] Save new brand with name: {}", request.getName());
        BrandEntity brand = brandService.save(request);
        return ResponseEntity.ok(new Resource<>(brand));
    }

    @PutMapping("")
    public ResponseEntity<Resource<BrandEntity>> update(@Valid @RequestBody UpdateBrandRequestDto request) {
        log.info("[BrandController] Update brand with id: {}", request.getId());
        BrandEntity brand = brandService.update(request);
        return ResponseEntity.ok(new Resource<>(brand));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Resource<?>> delete(@PathVariable Long id) {
        log.info("[BrandController] Delete brand with id: {}", id);
        brandService.delete(id);
        return ResponseEntity.ok(new Resource<>(null));
    }

    @GetMapping("")
    public ResponseEntity<Resource<List<BrandEntity>>> findAll() {
        log.info("[BrandController] Find all brands");
        return ResponseEntity.ok(new Resource<>(brandService.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource<BrandEntity>> findById(@PathVariable Long id) {
        log.info("[BrandController] Find brand with id: {}", id);
        return ResponseEntity.ok(new Resource<>(brandService.findById(id)));
    }

}
