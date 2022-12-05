const { ObjectId } = require('bson');
const { MongoTopologyClosedError } = require('mongodb');
const mongoose = require('mongoose');
const { object } = require('webidl-conversions');



const TipoSchema = mongoose.Schema({


    turno_hora:{
        type: String,
        trim: true
    },


    fechaCreacion:{
        type: Date,
        default: Date.now()
    },

    descripcion:{
        type: String,
        required: true,
        trim: true
    },

    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    }

  



});

module.exports = mongoose.model('Tipo_turno', TipoSchema);