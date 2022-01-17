const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 1
    },
    year: {
        type: Number,
        required: true,
        minlength: 4
    },
    imdbRating: {
        type: mongoose.SchemaTypes.Decimal128,
    },
    director: {
        type: String,
        minlength: 5
    },
    stars: [{type: String, minlength: 3}],
});

schema.plugin(uniqueValidator);
module.exports = mongoose.model('Movie', schema);