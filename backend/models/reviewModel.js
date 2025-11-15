
import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    productId:{type:mongoose.Schema.Types.ObjectId, ref:"product", required:true},
    rating:{type:Number, min:1, max:5, required:true},
    comment:{type:String, default:""}
},{timestamps:true}) ;

const review = mongoose.models.review || mongoose.model("review",reviewSchema) ; ;

export default review ;

