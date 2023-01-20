import bcrypt from 'bcrypt';
import {BadRequestError, ForbiddenError, NotAuthorizeError} from "../utils/erros";
import User from "../models/user";
import {EXPIRE_TIME} from "../config/redis";

class AuthController {

    transformUser(user) {
        user.set('password', undefined)
        return user
    }

    async login(req, res) {
        if (req.user) {
            throw new ForbiddenError('You must log out first')
        }
        const {username, password} = req.body

        const user = await User.scope('withPassword').findOne({where: {username}})

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new BadRequestError('Credential error')
        }
        this.transformUser(user)
        await User.update({status: 'active'}, {
            where: {
                id: user.id
            }
        })
        req.session.cookie.maxAge = EXPIRE_TIME
        req.session.user = user
        const {name, email, role} = user
        res.json({name, username, email, role})
    }

    async register(req, res) {
        if (req.user) {
            throw new ForbiddenError('You must log out first')
        }

        const data = req.body
        try {
            const {password} = data
            const hashedPassword = bcrypt.hashSync(password, 12)
            await User.create({...data, password: hashedPassword, status: 'pending'})
        } catch (error) {
            if (error.original.code === 'ER_DUP_ENTRY') {
                if (error.fields.username) {
                    throw new BadRequestError('username is duplicate')
                } else if (error.fields.email) {
                    throw new BadRequestError('email is duplicate')
                }
            }
        }
        res.end()
    }

    async logout(req, res) {
        const {user} = req
        if (!user) {
            throw new NotAuthorizeError()
        }
        await User.update({status: 'disabled'}, {
            where: {
                id: user.id
            }
        })
        req.session.destroy(err => {
            if (!err) {
                res.end()
            }
        })
    }
}

export default new AuthController()