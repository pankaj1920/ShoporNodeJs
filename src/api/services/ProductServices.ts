import ProductCategorySchema from "../models/ProductCategoryModel"
import ProductSchema from "../models/ProductModel"
import mongoose from "mongodb"
import Print from "../helpers/Print";
var ObjectId = require('mongodb').ObjectID;

class ProductService {

    static async getProductCategories() {
        const data = ProductCategorySchema.find({ "status": "enable" })
        return data
    }


    static async getProductListByCategories(category_id) {
        var data;
        var constrain = [{ status: "published" }, {
            stock_status:
                "in_stock"
        }]
        // data= ProductSchema.find({$and:constrain})
        Print.log("Catergory Id " + category_id)
        if (category_id === 'all') {
            data = ProductSchema.find().populate({ path: 'category' })

        } else {
            // data = ProductSchema.find({ name: "TRUE HUMAN" }).populate({ path: 'category' })
            data = ProductSchema.find({ category: ObjectId(category_id) }).populate({ path: 'category' })
        }
        return data

    }

    static async getProductDetail(product_id) {
        const data = ProductSchema.findById({ _id: ObjectId(product_id) })
        return data
    }

}


export default ProductService