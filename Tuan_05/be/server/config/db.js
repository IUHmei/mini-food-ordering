import mysql from 'mysql2/promise';


export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'miniFood',
    waitForConnections: true,
    connectionLimit: 10,
});