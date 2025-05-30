import express from "express";

const app = express();
// Define a route for GET //
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

//configure env
dotenv.config();

//database config
connectDB();



//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);





//PORT
const PORT = process.env.PORT || 8082;

//run listen
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
