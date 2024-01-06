const jwt = require('jsonwebtoken')

const generateLogToken = (user) =>{
    return jwt.sign(
        {
            _id:user._id,
            fname:user.fname,
            sname:user.sname,
            email:user.email,
            iat: Math.floor(Date.now()/1000)
        },
        process.env.JWT_PASS || 'jwtsecretkey',
        {
            expiresIn:'10d',
        }
    )
};

module.exports = generateLogToken;  