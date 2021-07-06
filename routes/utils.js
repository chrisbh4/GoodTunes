const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })
const cookieParser = require('cookie-parser')

const asyncHandler = (handler) => {
    return (req, res, next) => {
        return handler(req, res, next).catch(next)
    }
}










module.exports = { csrfProtection, asyncHandler }
