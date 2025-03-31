package hust.phone_selling_app.interfaces.promotion.web;

import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.domain.promotion.Promotion;
import hust.phone_selling_app.domain.shared.PromotionSearchCriteria;
import hust.phone_selling_app.interfaces.promotion.facade.PromotionServiceFacade;
import hust.phone_selling_app.interfaces.promotion.facade.dto.PromotionDTO;
import hust.phone_selling_app.interfaces.resource.Resource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/promotion")
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(name = "API Quản lý khuyến mại", description = "Phân quyền: STAFF")
public class PromotionController {

    private final PromotionServiceFacade promotionServiceFacade;

    @Operation(summary = "Tạo mới khuyến mại")
    @PostMapping("")
    public ResponseEntity<Resource<PromotionDTO>> createPromotion(
            @Valid @RequestBody PromotionCreationForm form) {
        log.info("Creating new promotion with name: {}", form.getName());

        Promotion promotion = new Promotion(
                null,
                form.getName(),
                form.getValue(),
                form.getStartDate(),
                form.getEndDate(),
                form.getCategoryId());

        PromotionDTO promotionDTO = promotionServiceFacade.create(promotion);
        return ResponseEntity.ok(new Resource<>(promotionDTO));
    }

    @Operation(summary = "Sửa thông tin khuyến mại")
    @PutMapping("")
    public ResponseEntity<Resource<PromotionDTO>> updatePromotion(
            @Valid @RequestBody PromotionUpdateForm form) {
        log.info("Updating promotion with ID: {}", form.getId());

        Promotion promotion = new Promotion(
                form.getId(),
                form.getName(),
                form.getValue(),
                form.getStartDate(),
                form.getEndDate(),
                form.getCategoryId());

        PromotionDTO promotionDTO = promotionServiceFacade.update(promotion);
        return ResponseEntity.ok(new Resource<>(promotionDTO));
    }

    @Operation(summary = "Xóa khuyến mại")
    @DeleteMapping("/{id}")
    public ResponseEntity<Resource<?>> deletePromotion(@PathVariable Long id) {
        log.info("Deleting promotion with ID: {}", id);
        promotionServiceFacade.delete(id);
        return ResponseEntity.ok(new Resource<>(null));
    }

    @Operation(summary = "Lấy thông tin khuyến mại")
    @GetMapping("/{id}")
    public ResponseEntity<Resource<PromotionDTO>> getPromotionById(@PathVariable Long id) {
        log.info("Getting promotion with ID: {}", id);
        PromotionDTO promotionDTO = promotionServiceFacade.getPromotionById(id);
        return ResponseEntity.ok(new Resource<>(promotionDTO));
    }

    @Operation(summary = "Tìm kiếm khuyến mại")
    @GetMapping("/search")
    public ResponseEntity<Resource<Page<PromotionDTO>>> searchPromotion(
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "createdAt") String sortBy,
            @RequestParam(required = false, defaultValue = "desc") String sortDir,
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long valueFrom,
            @RequestParam(required = false) Long valueTo,
            @RequestParam(required = false) Instant startAfter,
            @RequestParam(required = false) Instant endBefore) {
        log.info("Searching promotions");

        PromotionSearchCriteria criteria = PromotionSearchCriteria.builder()
                .page(page - 1)
                .size(size)
                .sortBy(sortBy)
                .sortDir(sortDir)
                .keyword(keyword)
                .categoryId(categoryId)
                .valueFrom(valueFrom)
                .valueTo(valueTo)
                .startAfter(startAfter)
                .endBefore(endBefore)
                .build();

        Page<PromotionDTO> promotionDTOs = promotionServiceFacade.search(criteria);
        return ResponseEntity.ok(new Resource<>(promotionDTOs));
    }
}