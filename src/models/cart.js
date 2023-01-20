import {BaseModal, sequelize, DataTypes} from "../config/database";
import Product from "./product";

class Cart extends BaseModal{}

Cart.init({
    product: {
        type: DataTypes.JSON
    }
}, {
    sequelize,
    modelName: 'cart',
})

export default Cart