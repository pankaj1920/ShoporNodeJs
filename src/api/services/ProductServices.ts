import ProductCategorySchema from "../models/ProductCategoryModel"

class ProductService {

    static async getProductCategories() {
        const data = ProductCategorySchema.find({ "status": "enable" })
        return data
    }

}


export default ProductService