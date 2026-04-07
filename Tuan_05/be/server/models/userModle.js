import { db } from "../config/db.js";

//Tạo user mới
export const createUser = async (email, password, name) => {
    try {
        const [result] = await db.query(
            "Insert into users(email, password, name) values(?, ?, ?)",
            [email, password, name]
        );
        return result.insertId;
    } catch (error) {
        console.error("Lỗi tạo user:", error);
        throw error;
    }
}

//Câp nhật thông tin người dùng
export const updateUser = async (id, name, email, password) => {
    try {
        const [result] = await db.query(
            "Update users set name = ?, email = ?, password = ? where id = ?",
            [name, email, password, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Lỗi cập nhật user:", error);
        throw error;
    }
}

//Lấy thốngtin người dùng theo id   
export const getUserById = async (id) => {
    try {
        const [rows] = await db.query(
            "Select * from users where id = ?",
            [id]
        );
        return rows[0];
    } catch (error) {
        console.error("Lỗi lấy user theo id:", error);
        throw error;
    }
}

//Lấy thông tin người dùng theo email
export const getUserByEmail = async (email) => {
    try {   
        const [rows] = await db.query(
            "Select * from users where email = ?",
            [email]
        );
        return rows[0];
    }
    catch (error) {
        console.error("Lỗi lấy user theo email:", error);
        throw error;
    }
}

//Lấy tất cả người dùng
export const getAllUsers = async () => {
    try {
        const [rows] = await db.query("Select id, email, name from users");
        return rows;
    } catch (error) {
        console.error("Lỗi lấy tất cả users:", error);
        throw error;
    }
}