import express from "express";
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js'; 
import './config/database.js';
import dotenv from 'dotenv';
dotenv.config();



const app = express();
const PORT = process.env.PORT ;

app.use(cors())

app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.get("/", (req, res) => {
    res.send("hello world");
})

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📋 Try: http://localhost:${PORT}/api/tasks`);
});




