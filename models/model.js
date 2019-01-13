var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/registros', function (error) {

    if (error) {
        throw error;
    } else {
        console.log("conectado a MongoDB");
    }
});

var programmersSchema = mongoose.Schema({
    nombre: { type: String, require: true },
    apellido: { type: String, require: true },
    user: { type: String, require: true },
    email:{type:String, require:true},
    informacion:{type:String, require:true},
    pass: { type: String, require: true },
    edad: { type: String, require: true },
    genero: { type: String, require: true }
    
});
var programmersModel = mongoose.model('Programmers', programmersSchema);
exports.programmersModel = programmersModel;