const User = require('../app/models/User.model')

module.exports = async (req, res, next) => {
    let tokenUser = req.cookies.tokenUser;
    if (tokenUser) {
        const tokenExist = await User.findOne({ tokenUser: tokenUser, deleted: "false", status: "active" }).select("-password")
        if (tokenExist) {
            res.locals.tokenExist = true;
            res.locals.infoUser = tokenExist;
        }
        else {
            res.locals.tokenExist = false;
        }
    }
    else {
        res.locals.tokenExist = false;
    }


    next()
} 