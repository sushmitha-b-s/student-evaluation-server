const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const token = req.header('auth-token')

    if (!token) return res.status(401).send('Access denied')

    try {
        const tokenVerified = await jwt.verify(token, process.env.TOKEN_SECRET)

        req.teacher = tokenVerified
        next()
    } catch (err) {
        res.status(400).send(err)
    }
}