/* Requires Mongoose Schema */
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

/* Creates a schema */
var linkSchema = new Schema({
    name:           {type: String, required: true, unique: true},
    link:           {type: String, required: true},
    category:       {type: String},
    vip:            {type: Boolean, default: false},
    counter:        {type: Number, default: 1},
}, {timestamps: true});

linkSchema.plugin(uniqueValidator);

/* Creates a model */
var linkModel = mongoose.model('Link', linkSchema);

/* Export model */
module.exports = linkModel;

