import express from "express";
import acl from "../middleware/acl";
import CartController from "../controllers/cart";
const router = new express.Router()

router.get('/', acl('USER'), CartController.list)
router.delete('/', acl('USER'), CartController.remove)

export default router