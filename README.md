# Mini Food Ordering System

## 📌 Mô tả
Hệ thống đặt món ăn nội bộ áp dụng Service-Based Architecture.

## 🏗️ Kiến trúc

- User Service (8081)
- Food Service (8082)
- Order Service (8083)
- Payment Service (8084)
- Frontend (ReactJS)

## 🚀 Cách chạy

### Backend
Mỗi service:
```bash
cd user-service
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Flow
[1] Register/Login
→ User Service

[2] Xem món
→ Food Service

[3] Tạo order
→ Order Service
   → gọi User Service
   → gọi Food Service

[4] Thanh toán
→ Payment Service
   → gọi Order Service (update status)

[5] Notification
→ console.log