import Product from "../models/product";
import {Op} from "sequelize";
import {isInt} from "ioredis/built/utils";
import {BadRequestError} from "../utils/erros";
import Category from "../models/category";

class SearchController {
    async search(req, res) {
        const {page, search} = req.query
        if (!isInt(page)) {
            throw new BadRequestError('The page param must be a number')
        }
        let orArray = []
        const searchQuery = search.split(' ').filter(el => el !== '')
        const fKData = await Category.findOne({
            where: {
                category: {[Op.in && Op.substring]: searchQuery}
            },
        })
        searchQuery.forEach(word => {
            orArray.push({
                [Op.or]: {
                    categoryId: {[Op.eq]: fKData ? fKData.id : null},
                    name: {[Op.substring]: word},
                    model: {[Op.substring]: word}
                },
            })
        })
        const products = await Product.findPaginate(page, {
            where: {
                [Op.and]: orArray,
            },
            include: ['user']
        })
        res.json(products)
    }
}

export default new SearchController()