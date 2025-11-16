
import review from "../models/reviewModel.js";

const reviewController = async(req, res) =>{
    try {
        const {userId, productId, rating, comment} = req.body ;
        // console.log(userId, productId, rating, comment) ;    
     

        const reviewExist = await review.findOne({userId, productId});
        if (reviewExist) return res.json({success:false, messsage:'Already reviewed'}) ;

        const newReview = await review.create({userId, productId, rating, comment}) ;

        res.json({success:true, review:newReview}) ;
        
    } catch (error) {
        console.log('review Error', error.messsage) ;
        res,json({success:false, message:error.message}) ;
    }
} ;



const allreview = async(req, res) =>{
    try {

        const reviews = await review.find({productId:req.params.productId}).populate("userId", "name"); ;
        const avg = reviews.length ? reviews.reduce((a,b)=> a+b.rating) / reviews.length :0 ;

        res.json({success:true, avgRating:avg, totalReviews:reviews.length, reviews}) ;
        
    } catch (error) {
        console.log("all reviewError", error.message) ;
        res.json({success:false, message:error.message})
    }

}

export {reviewController, allreview} ;