import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    rating: { type: String, required: true },
    comment: { type: String, required: true }

})

reviewSchema.set('timestamps', {
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
})

const ReviewSchema = mongoose.model('review', reviewSchema)
export default ReviewSchema