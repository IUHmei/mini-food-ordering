package minifood.orderservice.controller;

import minifood.orderservice.dto.OrderRequest;
import minifood.orderservice.dto.OrderResponse;
import minifood.orderservice.entity.Order;
import minifood.orderservice.service.OrderService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;
    private final RestTemplate restTemplate;

    // Cập nhật IP thật của các bạn trong nhóm ở đây
    private final String USER_SERVICE_URL = "http://192.168.1.10:8081/users/";
    private final String FOOD_SERVICE_URL = "http://192.168.1.11:8082/foods/";

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
        this.restTemplate = new RestTemplate();
    }

    @PostMapping
    public OrderResponse createOrder(@RequestBody OrderRequest request) {
        // 1. Validate user (Gọi sang User Service)
        try {
            // Lưu ý: RequestMapping bên User Service phải khớp (/users/{id})
            Object user = restTemplate.getForObject(USER_SERVICE_URL + request.getUserId(), Object.class);
            if (user == null) throw new RuntimeException("User không tồn tại trên hệ thống!");
        } catch (Exception e) {
            throw new RuntimeException("Lỗi kết nối User Service hoặc User không tồn tại");
        }

        // 2. Validate food (Gọi sang Food Service)
        try {
            Object food = restTemplate.getForObject(FOOD_SERVICE_URL + request.getFoodId(), Object.class);
            if (food == null) throw new RuntimeException("Món ăn này không còn bán!");
        } catch (Exception e) {
            throw new RuntimeException("Lỗi kết nối Food Service hoặc Món ăn không tồn tại");
        }

        // 3. Tạo order
        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setFoodId(request.getFoodId());
        order.setQuantity(request.getQuantity());
        order.setStatus("CREATED");

        Order saved = orderService.createOrder(order);

        return mapToResponse(saved);
    }

    // --- API QUAN TRỌNG CHO NGƯỜI 5 (PAYMENT SERVICE) ---
    @PutMapping("/{id}/status")
    public OrderResponse updateOrderStatus(@PathVariable Long id, @RequestBody String newStatus) {
        // Bạn cần viết thêm hàm findById trong OrderService nhé
        Order order = orderService.getAllOrders().stream()
                .filter(o -> o.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
        
        order.setStatus(newStatus); // Ví dụ: "PAID"
        Order updated = orderService.createOrder(order); // Lưu đè lại
        return mapToResponse(updated);
    }

    @GetMapping
    public List<OrderResponse> getOrders() {
        return orderService.getAllOrders().stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Hàm phụ để code sạch hơn (Mapping Entity -> DTO)
    private OrderResponse mapToResponse(Order o) {
        OrderResponse r = new OrderResponse();
        r.setOrderId(o.getId());
        r.setUserId(o.getUserId());
        r.setFoodId(o.getFoodId());
        r.setQuantity(o.getQuantity());
        r.setStatus(o.getStatus());
        return r;
    }
}