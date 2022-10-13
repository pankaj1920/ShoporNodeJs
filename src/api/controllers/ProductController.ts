
import { FileStoragePath, FileUploadParam } from './../helpers/Constants';
import { FILE_UPLOAD } from './../helpers/AppHandler';
import { NextFunction, Request, response, Response } from 'express';

import SFUploadMiddleware from "../middlewares/SFUploadMiddleware";
import BaseController from "./base/BaseController";
import ProductService from "../services/ProductServices";



class ProductController extends BaseController {

    addCategories() {
        FILE_UPLOAD.paramName = "file";
        FILE_UPLOAD.storagePath = FileStoragePath.categoriesPath;
        return this.asyncWrapper(async (req, res: Response) => {
            try {
                this.Print.log(" ========> " + FILE_UPLOAD.paramName)
                await SFUploadMiddleware(req, res)
                const a = req.file
                console.log(a)
                this.Print.log(a)
                this.SuccessResponse({ res: res, message: "Success Path " })

            } catch (err) {
                this.ErrorResponse({ res: res, message: "Error uploading " + err })
            }
        })
    }

    addProduct() {
        return this.asyncWrapper(async (req: Request, res: Response) => {

            const data = {
                name: req.body.name,
                description: req.body.description,
                content: req.body.content,
                status: req.body.status,
                images: req.body.images,
                quantity: req.body.quantity,
                is_featured: req.body.is_featured,
                category: req.body.category_id,
                sale_type: req.body.sale_type,
                price: req.body.price,
                sale_price: req.body.sale_price,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                stock_status: req.body.stock_status,
                num_review: req.body.num_review,
                rating: req.body.rating,
            }

            const result = await ProductService.addProduct(data)

            if (result) {
                this.SuccessResponseData({ res: res, message: "Product Added Successfully", data: result })
            } else {
                this.ErrorResponse({ res: res, message: "Error while adding product" })
            }

        })
    }

    getCategoryList() {
        return this.asyncWrapper(async (req: Request, res: Response) => {
            const data = await ProductService.getProductCategories()
            this.SuccessResponseData({ res: res, message: "Data fetch successfully", data: data })
        })
    }

    getProductListByCategories() {
        return this.asyncWrapper(async (req: Request, res: Response) => {
            const data = {
                category_id: req.body.category
            }

            const productList = await ProductService.getProductListByCategories(data.category_id)

            if (productList.length > 0) {
                this.SuccessResponseData({ res: res, message: "Data fetched Successfully", data: productList })
            } else {
                this.ErrorResponse({ res: res, message: "No Data Found" })
            }
        })
    }

    getDashboard() {
        return this.asyncWrapper(async (req, res) => {
            const categoryList = await ProductService.getProductCategories()
            const productList = await ProductService.getProductListByCategories("all")
            const data = { "categories": categoryList, "products": productList }
            this.SuccessResponseData({ res: res, data: data })
        })
    }

    getProductDetail() {
        return this.asyncWrapper(async (req, res) => {
            const data = { product_id: req.body.product_id }

            const productDetail = await ProductService.getProductDetail(data.product_id)

            if (productDetail) {
                this.SuccessResponseData({ res: res, data: productDetail })
            } else {
                this.ErrorResponse({ res: res, message: "Invalid product id" })
            }
        })
    }
}


const productController = new ProductController(ProductService)
export default productController