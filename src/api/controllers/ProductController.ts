import { body } from 'express-validator';
import { FileStoragePath, FileUploadParam } from './../helpers/Constants';
import { FILE_UPLOAD } from './../helpers/AppHandler';
import { NextFunction, Request, Response } from 'express';

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