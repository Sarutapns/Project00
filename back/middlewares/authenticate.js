const jwt = require('jsonwebtoken')
const db = require('../models/db')

module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new Error('Unauthorized')
        }
        const token = authorization.split(' ')[1]
        console.log('process.env.JWT_SECRET', process.env.JWT_SECRET)
        
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        console.log('payload', payload)

        const user = await db.user.findFirstOrThrow({ where: { id: payload.id } })
        console.log('user', user)

        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}
