import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from './server/routes/authRoute.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
