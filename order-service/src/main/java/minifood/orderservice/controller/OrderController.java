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
@CrossOrigin(origins = "*") // Cho phép frontend khác IP gọi
public class OrderController {

    private final OrderService orderService;
    private final RestTemplate restTemplate;

    // Thêm địa chỉ IP của User Service + Food Service
    private final String USER_SERVICE_URL = "http://192.168.1.10:8081/users/";
    private final String FOOD_SERVICE_URL = "http://192.168.1.11:8082/foods/";

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
        this.restTemplate = new RestTemplate();
    }

    // Tạo order mới
    @PostMapping
    public OrderResponse createOrder(@RequestBody OrderRequest request) {

        // 1. Validate user
        // try {
        //     Object user = restTemplate.getForObject(USER_SERVICE_URL + request.getUserId(), Object.class);
        //     if (user == null) throw new RuntimeException();
        // } catch (Exception e) {
        //     throw new RuntimeException("User không tồn tại");
        // }

        // // 2. Validate food
        // try {
        //     Object food = restTemplate.getForObject(FOOD_SERVICE_URL + request.getFoodId(), Object.class);
        //     if (food == null) throw new RuntimeException();
        // } catch (Exception e) {
        //     throw new RuntimeException("Món ăn không tồn tại");
        // }

        // 3. Tạo order
        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setFoodId(request.getFoodId());
        order.setQuantity(request.getQuantity());
        order.setStatus("CREATED");

        Order saved = orderService.createOrder(order);

        // 4. Trả về response
        OrderResponse response = new OrderResponse();
        response.setOrderId(saved.getId());
        response.setUserId(saved.getUserId());
        response.setFoodId(saved.getFoodId());
        response.setQuantity(saved.getQuantity());
        response.setStatus(saved.getStatus());

        return response;
    }

    // Lấy tất cả order
    @GetMapping
    public List<OrderResponse> getOrders() {
        List<Order> orders = orderService.getAllOrders();
        List<OrderResponse> responses = new ArrayList<>();
        for (Order o : orders) {
            OrderResponse r = new OrderResponse();
            r.setOrderId(o.getId());
            r.setUserId(o.getUserId());
            r.setFoodId(o.getFoodId());
            r.setQuantity(o.getQuantity());
            r.setStatus(o.getStatus());
            responses.add(r);
        }
        return responses;
    }
}