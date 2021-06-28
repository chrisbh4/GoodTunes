const db = require('./db/models');

const loginUser = (req, res, user) => {
    req.session.auth = {
        userId: user.id
    }
}

const logoutUser = (req, res) => {
    delete req.session.auth
}

const requireAuth = (req, res, next) => {
    if (!res.locals.authenticated) {
        return res.redirect('/users/login');
    }
    return next()
}


// const restoreUser = async( req , res , next)=>{
//     if( req.session.auth){
//         const { userId }= req.session.auth
//         try{

           //TODO create restore userAuth
//             const user = await db.
//         }
//     }
// }

module.exports = {
    loginUser,
    logoutUser,
    requireAuth
}
