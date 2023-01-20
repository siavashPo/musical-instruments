import User from "../models/user";
import {NotFoundError} from "../utils/erros";
import bcrypt from "bcrypt";

class ProfileController {
    transformUser(user) {
        delete user.dataValues.id
        user.set('password', undefined)
        return user
    }

    async get(req, res) {
        const {id} = req.user
        const user = await User.find(id)
        res.json(user)
    }

    async update(req, res) {
        const {name, email, password, role} = req.body
        const {id} = req.user
        const user = await User.find(id)
        if (!user) {
            throw new NotFoundError('User Not Found')
        }
        if (password) {
            user.password = bcrypt.hashSync(password, 12)
        }
        user.id = id
        user.name = name
        user.email = email
        user.role = role
        await user.save()
        this.transformUser(user)
        res.json(user)
    }
}

export default new ProfileController()