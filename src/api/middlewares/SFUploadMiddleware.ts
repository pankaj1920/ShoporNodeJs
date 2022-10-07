import { json } from 'express';
import util from "util"
import multer from 'multer'
import Print from "../helpers/Print";
import path from 'path'
import { FILE_UPLOAD } from "../helpers/AppHandler";
const storagePath = path.join(__dirname + '../../../../res/static/asset/')
const maxSize = 2 * 1024 * 1024;


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, FILE_UPLOAD.storagePath);
        cb(null, storagePath);
    },
    filename: (req, file, cb) => {
        const fileName = `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`
        FILE_UPLOAD.imagePath = fileName
        cb(null, fileName)
        // cb(null, `${file.fieldname.replaceAll(" ", "_").replace}_${Date.now()}${path.extname(file.originalname)}`)
    },
});

let uploadFile = multer({
        storage: storage,
        limits: { fileSize: maxSize },
}).single("file");


const SFUploadMiddleware = util.promisify(uploadFile)

export default SFUploadMiddleware