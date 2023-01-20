import {BaseModal, sequelize, DataTypes, ENUM} from "../config/database";
import Product from "./product";
import Cart from "./cart";

class User extends BaseModal {}

User.init({
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    username: {
        type: DataTypes.STRING,
        // unique: true,
        validate: {
            notEmpty: false
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    email: {
        type: DataTypes.STRING,
        // unique: true,
        validate: {
            notEmpty: false
        }
    },
    role: {
        type: ENUM('ADMIN', "SELLER", "USER"),
        validate: {
            notEmpty: false
        },
    },
    status: {
        type: ENUM("pending", "active", "disabled"),
    },
}, {
    sequelize,
    modelName: 'user',
    defaultScope: {
        attributes: {
            exclude: ['id', 'password', 'status', 'createdAt', 'updatedAt']
        }
    },
    scopes: {
        withPassword: {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }
    },
})
User.hasMany(Product)
Product.belongsTo(User)
User.hasOne(Cart)
Cart.belongsTo(User)

export default User