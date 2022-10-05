import { FileStoragePath, FileUploadParam } from './../helpers/Constants';
import { FILE_UPLOAD } from './../helpers/AppHandler';
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
                const a = req.file.path
                this.SuccessResponse({ res: res, message: "Success Path " + a.replaceAll("//", "/") })

            } catch (err) {
                this.ErrorResponse({ res: res, message: "Error uploading " + err })
            }
        })
    }
}


const productController = new ProductController(ProductService)
export default productController