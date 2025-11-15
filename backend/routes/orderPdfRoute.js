import express from "express";
import OrderPdfController from "../controllers/orderPdfController.js";

const OrderPdfrouter = express.Router() ;

OrderPdfrouter.get("/:orderId", OrderPdfController) ;

export default OrderPdfrouter ;
