package minifood.orderservice.entity; // 1. Đảm bảo đúng dòng package này

import jakarta.persistence.*; // 2. Thêm dòng này để nhận @Entity, @Id, @Table
import lombok.Data;          // 3. Thêm dòng này để nhận @Data

@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "food_id")
    private Long foodId;

    private int quantity;

    @Column(name = "order_status")
    private String status;
}