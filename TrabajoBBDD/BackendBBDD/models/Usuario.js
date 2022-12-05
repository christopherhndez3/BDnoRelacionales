const { __Directive } = require('graphql');
const mongoose = require('mongoose');
const { arrayBuffer } = require('stream/consumers');


const UsuarioSchema = mongoose.Schema({

    nombre:{
        type: String,
        required: true,
        trim: true
    },
    rut:{
        type: String,
        required: true,
        trim: true
    },
    telefono:{
        type: Number,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    direccion:{
        type: String,
        required: true,
        trim: true
    },

    tipo_usuario:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    }
  


});

module.exports = mongoose.model('Usuario', UsuarioSchema);