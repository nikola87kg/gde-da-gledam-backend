/* Requires Mongoose Schema */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcryptjs");
const env = require('dotenv').config().parsed;

/* Creates a schema */
var userSchema = new Schema({
    email:          {type: String, required: true, unique: true},
    password:       {type: String, required: true},
    role:           {type: String, default: 'visitor'}
}, {timestamps: true});

/* Unique validator */
userSchema.plugin(uniqueValidator);

/* Encrypt password */
userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        next();
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

/* Creates a model */
var userModel = mongoose.model('User', userSchema);

/* Export model */
module.exports = userModel;

