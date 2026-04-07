import jwt from 'jsonwebtoken';

export const protectedRoute = (req, res, next) => {
    try {
        //Lấy token từ header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Không tìm thấy token' });
        }
        
        //Xác thực token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token không hợp lệ' });
            }
            //Tìm user
            const userId = user.id;
            if (!userId) {
                return res.status(404).json({ message: 'Không tìm thấy user' });
            }
            req.user = { id: userId };
            next();
        })
    } catch (error) {
        console.error("Lỗi xác thực:", error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}