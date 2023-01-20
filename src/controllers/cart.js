import Cart from "../models/cart";
import {NotFoundError} from "../utils/erros";

class CartController {
    async list(req, res) {
        const {id} = req.user
        const {page} = req.params
        const products = await Cart.findPaginate(page, {
            where: {
                userId: id
            }
        })
        res.json(products)
    }

    async remove(req, res) {
        const {id: userId} = req.user
        const {id: productId} = req.body
        const product = await Cart.find(+productId)
        if (!product || product.userId !== userId) {
            throw new NotFoundError('Product Not Found In Your Cart')
        }
        await product.remove()
        res.end()
    }
}

export default new CartController()