
import express from "express";
import salesController from "../controllers/salesController.js";

const salesRouter = express.Router() ;

salesRouter.get("/sales", salesController) ;

export default salesRouter ;