// package minifood.orderservice.service;

// import minifood.orderservice.entity.Order;
// import minifood.orderservice.repository.OrderRepository;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;
// import java.util.List;

// @Service
// public class OrderService {
//     private final OrderRepository orderRepository;

//     public OrderService(OrderRepository orderRepository) {
//         this.orderRepository = orderRepository;
//     }

//     public Order createOrder(Order order) {
//         order.setStatus("CREATED");
//         return orderRepository.save(order);
//     }

//     public List<Order> getAllOrders() {
//         return orderRepository.findAll();
//     }
// }

package minifood.orderservice.service;

import minifood.orderservice.entity.Order; // Import class Entity vào
import minifood.orderservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired; // Thêm dòng này
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderService {

    @Autowired // Phải có cái này mới dùng được repository
    private OrderRepository orderRepository;

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}