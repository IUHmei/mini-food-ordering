package iuh.edu.vn.PaymentNotificationService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "*") // Cho phép Frontend gọi vào từ máy khác [cite: 92]
public class PaymentController {

    @PostMapping
    public String processPayment(@RequestBody PaymentRequest request) {
        // 1. Giả lập logic: Thanh toán thành công (Mức tối thiểu) [cite: 20]
        
        // 2. In log thông báo ra màn hình Console của bạn [cite: 74, 76]
        System.out.println("--- THÔNG BÁO HỆ THỐNG ---");
        System.out.println("Đơn hàng #" + request.getOrderId() + " đã thanh toán thành công qua " + request.getMethod());
        System.out.println("User ID: " + request.getUserId() + " đã hoàn tất giao dịch."); 
        // [cite: 78]
        
        // Lưu ý: Sau này bạn sẽ viết thêm dòng code gọi sang Order Service (Người 4) ở đây 
        
        return "Thanh toán thành công cho đơn hàng: " + request.getOrderId();
    }
}

// Lớp dữ liệu đơn giản để nhận thông tin từ Postman/Frontend
class PaymentRequest {
    private String orderId;
    private String userId;
    private String method;

    // Getter/Setter (Bạn có thể chuột phải trong Eclipse chọn Source -> Generate Getters and Setters)
    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }
}