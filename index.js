import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import taskRoutes from './routes/taskRoutes.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
app.use(express.urlencoded())
app.use(cors({origin:process.env.ORIGIN}));
app.use(express.json());
app.use(cookieParser())
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.get('/login', async (req,res) => {
  const token = jwt.sign({id : process.env.USER_ID   }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY})
  console.log(token);
  return res.status(200).json({token})
})
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error)=> console.log(error , "this is the error"));