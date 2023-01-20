import express from "express";
import acl from "../middleware/acl";
import ProductController from "../controllers/seller/product";
import {validate} from "express-jsonschema";
import {createProductSchema, updateProductSchema} from "../validators/product";

const router = express.Router()

router.get('/', acl('SELLER'), ProductController.list)
router.get('/:id(\\d+)', acl('SELLER'), ProductController.get)
router.post('/', acl('SELLER'), validate(createProductSchema), ProductController.add)
router.put('/:id(\\d+)', acl('SELLER'), validate(updateProductSchema), ProductController.update)
router.delete('/:id(\\d+)', acl('SELLER'), ProductController.remove)
router.post('/:id(\\d+)', acl('USER'), ProductController.addToCart)

export default router