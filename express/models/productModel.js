/* Requires Mongoose Schema */
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

/* Creates a schema */
var linkSchema = new Schema({
    name:           {type: String, required: true, unique: true},
    link:           {type: String, required: true},
    vip:            {type: Boolean, default: false},
    category:       {type: String},
    description:    {type: String},
    slug:           {type: String, required: true, trim: true},
    counter:        {type: Number, default: 1},
}, {timestamps: true});

linkSchema.plugin(uniqueValidator);

/* Creates a model */
var linkModel = mongoose.model('Link', linkSchema);

/* Export model */
module.exports = linkModel;

