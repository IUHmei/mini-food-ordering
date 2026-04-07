import { createUser, getUserByEmail, updateUser, getUserById, getAllUsers } from "../models/userModle.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Đăng ký tài khoản mới
export const register = async (req, res) => {
    try {
        const {email, password, lastName, firstName } = req.body;
        if(!email || !password || !lastName || !firstName){
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
        }
        //Kiểm tra xem email đã tồn tại chưa
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.status(400).json({ message: "Email đã tồn tại" });
        }
        //Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
        //Tạo người dùng mới
        const userId = await createUser(email, hashedPassword, `${firstName} ${lastName}`);
        res.status(201).json({ message: "Đăng ký thành công", userId: userId, email: email, name: `${firstName} ${lastName}` });
    } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi đăng ký", error: error.message });
    }
}

//đăng nhập
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
        }
        //Kiểm tra xem email có tồn tại không
        const user = await getUserByEmail(email);
        if(!user){
            return res.status(400).json({ message: "Email không tồn tại" });
        }
        //So sánh mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: "Mật khẩu không đúng" });
        }
        //Tạo token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: "Đăng nhập thành công", token: token });
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi đăng nhập", error: error.message });
    }
}

//Đăng xuất
export const logout = (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(400).json({ message: "Token không được cung cấp" });
        }
        
        res.json({ 
            message: "Đăng xuất thành công",
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi đăng xuất", error: error.message });
    }
}

// Lấy tất cả người dùng
export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json({ 
            message: "Lấy danh sách users thành công",
            count: users.length,
            users: users
        });
    } catch (error) {
        console.error("Lỗi khi lấy users:", error);
        res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
    }
}

///