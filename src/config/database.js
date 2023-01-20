import {Sequelize, Model, where} from 'sequelize'

export * from 'sequelize'

export const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        dialect: 'mysql',
        port: +process.env.DATABASE_PORT,
        host: process.env.DATABASE_HOST,
        logging: process.env.NODE_ENV === 'development' ? logQueries : false
    }
)

function logQueries(query) {
    console.log('Database query: ', query)
}

export class BaseModal extends Model {

    static find(id, options = {}) {
        return this.findByPk(id, options)
    }

    remove() {
        return this.constructor.destroy({
            where: {id: this.id}
        })
    }

    static DEFAULT_PAGE_SIZE = 10

    static async findPaginate(page = 1, options) {
        page = +page
        const {
            limit = this.DEFAULT_PAGE_SIZE,
            offset = (page - 1) * limit,
            ...otherOptions
        } = options

        const {count: totals, rows: items} = await this.findAndCountAll({
            order: [['id', 'DESC']],
            limit,
            offset,
            ...otherOptions
        })

        const pages = Math.ceil(totals / limit)

        return {
            items,
            pagination: {
                totals,
                page,
                pages,
                limit,
                hasPrevPage: page > 1,
                hasNextPage: page < pages,
                offset,
                prevPage: page - 1 || null,
                nextPage: page < pages ? page + 1 : null
            }
        }
    }
}