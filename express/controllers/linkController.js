// Model
var LinkModel = require("../models/linkModel");


/* CREATE NEW */
exports.post = async (req, res, next) => {

    try {
        /* Create an instance */
        const instance = new LinkModel({
            name: req.body.name,
            link: req.body.link,
            category: req.body.category,
            vip: req.body.vip,
            icon: req.body.icon,
        });

        /* Save instance to DB */
        const savedData = await instance.save()

        /* Send response  */
        res.status(201).json( savedData );

    } catch(e) {
        /* Send response with error  */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during creating an instance --> ', e, '\x1b[0m');
    }
}

/* GET ALL */
exports.getAll = async (req, res, next) => {

    try {
        /* Query to DB - GET link list */
        const dbList = await LinkModel.find();
        if(dbList) {
            /* Send response with a list object */
            res.status(200).json( dbList )

        } else {
            /* Send error - no list in DB */
            res.status(404).json();
            console.error("\x1b[41m", 'No list found ','\x1b[0m');
        }

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during getting the list --> ', e,'\x1b[0m');
    }
}

/* DELETE LINK */
exports.delete = async (req, res, next) => {

    try {
        /* Query to DB - DELETE data */
        const deletedData = await LinkModel.findOneAndDelete( {  _id: req.params.id } );

        /* Send response with updated object */
        res.status(200).json( deletedData )
    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during deleting an object --> ', e,'\x1b[0m');
    }
}
