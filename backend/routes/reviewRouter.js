
import express from "express";
import { reviewController, allreview} from "../controllers/reviewController.js";
import authUser from "../middleware/auth.js";

const reviewRouter = express.Router() ;
reviewRouter.post("/reviews", authUser ,reviewController) ;

reviewRouter.get("/get/:productId",  allreview) ;

export default reviewRouter ;