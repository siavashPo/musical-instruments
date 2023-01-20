import {sequelize, BaseModal, DataTypes} from "../config/database";
import Cart from "./cart";

class Product extends BaseModal {
}

Product.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        model: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        price: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true
            }
        },
        image: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        modelName: 'product',
        defaultScope: {
            attributes: {
                exclude: ['userId', 'categoryId']
            }
        },
    },
)

export default Product