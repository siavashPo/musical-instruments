import {sequelize, BaseModal, DataTypes, ENUM} from "../config/database";
import Product from "./product";

class Category extends BaseModal {
}

Category.init({
    category: {
        type: ENUM('MUSIC', "MOBILE", "LAPTOP"),
        validate: {
            notEmpty: true,
        }
    },
}, {
    sequelize,
    modelName: 'category',
    defaultScope: {
        attributes: {
            exclude: ['id', 'createdAt', 'updatedAt']
        }
    },
    scopes: {
        withId: {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }
    },
})

Category.hasMany(Product)
Product.belongsTo(Category)

export default Category