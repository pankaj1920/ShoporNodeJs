import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema([{
    product_id: {},
    name: {},
    rating: {},
    comment: {}
}])

reviewSchema.set('timestamps', {
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
})

const ReviewSchema = mongoose.model('review', reviewSchema)
export default ReviewSchema