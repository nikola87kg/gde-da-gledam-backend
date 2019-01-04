// Model
var User = require("../models/userModel");

// dependencies
var jwt = require("jsonwebtoken");
const env = require('dotenv').config().parsed;

/* REGISTER NEW USER */
exports.register = async (req, res, next) => {

    try {
        /* create user instance */
        let userNew = new User();
        userNew.email = req.body.email;
        userNew.password = req.body.password;

        /* save user */
        const savedUser = await userNew.save();

        /* send response with user object */
        res.status(201).json({ object: savedUser });

    } catch(e) {

        /* send response with error object */
        res.status(500).json(e);
        console.error('Error during registering a user --> ', e);
    }

}

/* LOGIN EXISTING USER */
exports.login = async (req, res, next) => {
    console.log('login')
    try {
        /* Query to DB - GET user */
        const regUser = await User.findOne( {email: req.body.email} )
        if( !regUser ) {
            /* send response with error object */
            res.status(401).json({error: 'username error'});
            console.error('Error! User with this email does not exist');
        } else {
            regUser.comparePassword(req.body.password, async (err, isMatch) => {
                const secret = JSON.stringify(env.JWT_SECRET)
                console.log(secret)
                if (isMatch && !err) {
                    /* create a token */
                    const newToken = await jwt.sign({
                        email: regUser.email,
                        userId: regUser._id,
                        role: regUser.role
                    }, secret);

                    /* send response with the token */
                    res.status(200).json({
                        token: newToken,
                        role: regUser.role,
                        expiresIn: 3600
                    })
                }
            });
        }
    } catch(e) {
        /* send response with error object */
        res.status(500).json(e);
        console.error('Error during user login --> ', e);
    }
}


/* LOGIN WITH FACEBOOK */
exports.facebook = async (req, res, next) => {
    console.log('facebook')
}
