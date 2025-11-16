import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import OrderPdfrouter from "./routes/orderPdfRoute.js";
import reviewRouter from "./routes/reviewRouter.js";
import salesRouter from "./routes/salesRoute.js";




// App config
const app = express();
const port = 8000;

// Initialize connections
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/order/pdf", OrderPdfrouter) ;
app.use("/api/product/review",reviewRouter) ;
app.use("/api/admin/sum", salesRouter) ;


// Health check route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
