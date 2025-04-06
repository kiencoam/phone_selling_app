package hust.phone_selling_app.interfaces.order.web;

import java.time.Instant;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.domain.order.OrderStatus;
import hust.phone_selling_app.domain.order.PaymentMethod;
import hust.phone_selling_app.domain.order.ReceiveMethod;
import hust.phone_selling_app.domain.shared.OrderSearchCriteria;
import hust.phone_selling_app.infrastructure.utils.JwtUtils;
import hust.phone_selling_app.interfaces.order.facade.OrderServiceFacade;
import hust.phone_selling_app.interfaces.order.facade.dto.OrderDTO;
import hust.phone_selling_app.interfaces.resource.Resource;
import hust.phone_selling_app.interfaces.utils.ValueOfEnum;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/order")
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(name = "API Quản lý đơn hàng")
public class OrderController {

    private final OrderServiceFacade orderServiceFacade;
    private final JwtUtils jwtUtils;

    @Operation(summary = "Tạo mới đơn hàng từ sản phẩm", description = "Phân quyền: CUSTOMER")
    @PostMapping("/customer/create-from-product")
    public ResponseEntity<Resource<OrderDTO>> createOrderFromProduct(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody FromVariantOrderCreationForm form) {
        log.info("Create order from variant with id: {}", form.getVariantId());

        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        OrderDTO dto = orderServiceFacade.createOrderFromVariant(
                form.getVariantId(), form.getQuantity(), userId, form.getShippingInfoId(), form.getPaymentMethod(),
                form.getReceiveMethod(), form.getNote());

        return ResponseEntity.ok(new Resource<>(dto));
    }

    @Operation(summary = "Tạo mới đơn hàng từ giỏ hàng", description = "Phân quyền: CUSTOMER")
    @PostMapping("/customer/create-from-cart")
    public ResponseEntity<Resource<OrderDTO>> createOrderFromCart(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody FromCartOrderCreationForm form) {
        log.info("Create order from cart");

        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        OrderDTO dto = orderServiceFacade.createOrderFromCart(
                userId, form.getShippingInfoId(), form.getPaymentMethod(), form.getReceiveMethod(), form.getNote());

        return ResponseEntity.ok(new Resource<>(dto));
    }

    @Operation(summary = "Xác nhận đơn hàng", description = "Phân quyền: STAFF")
    @PutMapping("/staff/confirm/{id}")
    public ResponseEntity<Resource<?>> confirmOrder(@PathVariable Long id) {
        log.info("Confirm order with id: {}", id);
        orderServiceFacade.confirmOrder(id);
        return ResponseEntity.ok(new Resource<>(null));
    }

    @Operation(summary = "Hủy đơn hàng", description = "Phân quyền: STAFF")
    @PutMapping("/staff/cancel/{id}")
    public ResponseEntity<Resource<?>> cancelOrder(@PathVariable Long id) {
        log.info("Cancel order with id: {}", id);
        orderServiceFacade.cancelOrder(id);
        return ResponseEntity.ok(new Resource<>(null));
    }

    @Operation(summary = "Chuyển sang bên giao hàng", description = "Phân quyền: STAFF")
    @PutMapping("/staff/deliver/{id}")
    public ResponseEntity<Resource<?>> deliverOrder(@PathVariable Long id) {
        log.info("Deliver order with id: {}", id);
        orderServiceFacade.deliverOrder(id);
        return ResponseEntity.ok(new Resource<>(null));
    }

    @Operation(summary = "Xác nhận đã nhận hàng", description = "Phân quyền: STAFF")
    @PutMapping("/staff/receive/{id}")
    public ResponseEntity<Resource<?>> receiveOrder(@PathVariable Long id) {
        log.info("Receive order with id: {}", id);
        orderServiceFacade.receiveOrder(id);
        return ResponseEntity.ok(new Resource<>(null));
    }

    @Operation(summary = "Lấy thông tin chi tiết đơn hàng", description = "Phân quyền: STAFF")
    @GetMapping("staff/{id}")
    public ResponseEntity<Resource<OrderDTO>> getOrder(@PathVariable Long id) {
        log.info("Get order with id: {}", id);
        OrderDTO dto = orderServiceFacade.getOrderById(id);
        return ResponseEntity.ok(new Resource<>(dto));
    }

    @Operation(summary = "Tìm kiếm đơn hàng", description = "Phân quyền: STAFF")
    @GetMapping("/staff/search")
    public ResponseEntity<Resource<Page<OrderDTO>>> searchOrders(
            @Min(1) @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "createdAt") String sortBy,
            @RequestParam(required = false, defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String receiveName,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String address,
            @ValueOfEnum(enumClass = OrderStatus.class) @RequestParam(required = false) String status,
            @ValueOfEnum(enumClass = PaymentMethod.class) @RequestParam(required = false) String paymentMethod,
            @ValueOfEnum(enumClass = ReceiveMethod.class) @RequestParam(required = false) String receiveMethod,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long priceFrom,
            @RequestParam(required = false) Long priceTo,
            @RequestParam(required = false) Instant orderDateFrom,
            @RequestParam(required = false) Instant orderDateTo) {
        log.info("Search orders");
        OrderSearchCriteria searchCriteria = OrderSearchCriteria.builder()
                .page(page - 1)
                .size(size)
                .sortBy(sortBy)
                .sortDir(sortDir)
                .receiveName(receiveName)
                .phone(phone)
                .address(address)
                .status(status)
                .paymentMethod(paymentMethod)
                .receiveMethod(receiveMethod)
                .keyword(keyword)
                .priceFrom(priceFrom)
                .priceTo(priceTo)
                .orderDateFrom(orderDateFrom)
                .orderDateTo(orderDateTo)
                .build();
        Page<OrderDTO> orders = orderServiceFacade.searchOrders(searchCriteria);
        return ResponseEntity.ok(new Resource<>(orders));
    }

    @Operation(summary = "Lấy danh sách đơn hàng của người dùng", description = "Phân quyền: CUSTOMER")
    @GetMapping("/customer")
    public ResponseEntity<Resource<List<OrderDTO>>> getOrdersByUserId(
            @RequestHeader("Authorization") String token) {
        log.info("Get orders by user id");

        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        List<OrderDTO> orders = orderServiceFacade.getOrdersByUserId(userId);
        return ResponseEntity.ok(new Resource<>(orders));
    }

    @Operation(summary = "Lấy danh sách đơn hàng của người dùng theo trạng thái", description = "Phân quyền: CUSTOMER")
    @GetMapping("/customer/status/{status}")
    public ResponseEntity<Resource<List<OrderDTO>>> getOrdersByUserIdAndStatus(
            @RequestHeader("Authorization") String token,
            @ValueOfEnum(enumClass = OrderStatus.class) @PathVariable String status) {
        log.info("Get orders by user id and status: {}", status);

        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        List<OrderDTO> orders = orderServiceFacade.getOrdersByUserIdAndStatus(userId, status);
        return ResponseEntity.ok(new Resource<>(orders));
    }

    @Operation(summary = "Lấy thông tin chi tiết đơn hàng của người dùng", description = "Phân quyền: CUSTOMER")
    @GetMapping("/customer/{id}")
    public ResponseEntity<Resource<OrderDTO>> getOrderById(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id) {
        log.info("Get order by id: {}", id);

        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        OrderDTO dto = orderServiceFacade.getOrderByIdAndUserId(id, userId);
        return ResponseEntity.ok(new Resource<>(dto));
    }

    @Operation(summary = "Hủy đơn hàng của người dùng", description = "Phân quyền: CUSTOMER")
    @PutMapping("/customer/cancel/{id}")
    public ResponseEntity<Resource<?>> cancelOrderByUserId(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id) {
        log.info("Cancel order by user id: {}", id);

        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        orderServiceFacade.cancelCustomerOrder(id, userId);
        return ResponseEntity.ok(new Resource<>(null));
    }

}
