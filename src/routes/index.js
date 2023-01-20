import express from "express";
import general from "./general";
import auth from "./auth";
import profile from "./profile";
import product from "./product";
import uploader from "../middleware/uploader";
import acl from "../middleware/acl";
import FileController from '../controllers/file'
import {NotFoundError} from "../utils/erros";
import cart from "./cart";

const router = express.Router()

router.use('/', general)
router.use('/auth', auth)
router.use('/profile', profile)
router.use('/product', product)
router.use('/cart', cart)

router.post('/upload', acl('SELLER'), uploader.single('image'), FileController.upload)

router.all('*', (req, res) => {
    throw new NotFoundError()
})

export default router