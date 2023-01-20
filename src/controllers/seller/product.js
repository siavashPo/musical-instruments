import Product from "../../models/product";
import Category from "../../models/category";
import {BadRequestError, NotFoundError} from "../../utils/erros";
import Cart from "../../models/cart";

class ProductController {

    async list(req, res) {
        const {page} = req.query
        const products = await Product.findPaginate(page, {
            include: ['user', 'category']
        })
        res.json(products)
    }

    async get(req, res) {
        const {id} = req.params
        const product = await Product.find(+id, {
            include: ['user', 'category']
        })
        if (!product) {
            throw new NotFoundError('Product Not Found')
        }
        res.json(product)
    }

    async add(req, res) {
        const {category, ...data} = req.body
        const {id} = req.user
        try {
            let categoryFK
            const categoryData = await Category.scope('withId').findOne({where: {category}})
            if (!categoryData) {
                await Category.create({category})
                const data = await Category.scope('withId').findOne({where: {category}})
                categoryFK = data.id
            }else {
                categoryFK = categoryData.id
            }
            await Product.create({...data, userId: id, categoryId: categoryFK})
        } catch (error) {
            if (error.original.code === 'ER_DUP_ENTRY') {
                if (error.fields.model) {
                    throw new BadRequestError('Model is exist')
                }
            }
        }
        res.end()
    }

    async update(req, res) {
        const {id} = req.params
        const {category, ...data} = req.body
        const product = await Product.find(+id)
        const categoryData = await Category.find(+id)
        if (!product) {
            throw new NotFoundError('Product Not found')
        }
        for (const dataKey in data) {
            product[dataKey] = data[dataKey]
        }
        category ? categoryData.category = category : false
        await product.save()
        res.end()
    }

    async remove(req, res) {
        const {id} = req.params
        const product = await Product.find(+id)
        if (!product) {
            throw new NotFoundError('Product Not Found')
        }
        await product.remove()
        res.end()
    }

    async addToCart(req, res) {
        const {id: userId} = req.user
        const {id: productId} = req.params
        const product = await Product.find(+productId)
        if (!product) {
            throw new NotFoundError('Product Not Found')
        }
        await Cart.create({product, userId})
        res.end()
    }
}

export default new ProductController()