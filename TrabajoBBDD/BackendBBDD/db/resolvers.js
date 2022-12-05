const Usuario = require('../models/Usuario');
const TipoTurno = require('../models/TipoTurno');

const bcryptjs = require('bcryptjs')
require('dotenv').config({path: 'variables.env'});
const jwt = require('jsonwebtoken');
const { db } = require('../models/TipoTurno');


const crearToken = (usuario, secreta, expiresIn) =>{
   
    
    const {id, email, nombre, rut, telefono, direccion, turno, tipo_usuario} = usuario;
    
    return jwt.sign({id,email,nombre,rut,telefono,direccion, turno, tipo_usuario }, secreta, {expiresIn})

}



const resolvers ={
    Query:{
        obtenerUsuario: async (_, {}, ctx) => {
        return ctx.usuario;
        },

        obtenerUsuarioID: async (_,{id}) =>{
            // revisar si el usuario existe
            const buscarUser = await Usuario.findById(id);

            if(!buscarUser){
                throw new Error ('Usuario no encontrado');
            }

            return buscarUser;



        },

        obtenerTodosUsuario: async() =>{

            try {
                const usuarios = await Usuario.find({})
                return usuarios;
            } catch (error) {
                
            }

        },

        obtenerTodosUsuarioNormal: async () =>{
            try {

                const usuario = await Usuario.find({tipo_usuario:'User'})
                return usuario;
                
            } catch (error) {
                return error;
            }
        },

        obtenerTurnosFecha: async (_,{input}) =>{

            const {fecha_inicio, fecha_final} = input;

            if(!fecha_inicio && !fecha_final){
                throw new Error ('Fecha no existe')
            }

            const buscarFecha = await TipoTurno.find({  
                $and: [
                {fechaCreacion: {$gte: new Date(input.fecha_inicio)}},
                {fechaCreacion: {$lte: new Date(input.fecha_final)}}
              ]}).populate('usuario')

             
            return buscarFecha;

        },

        obtenerTurnos: async() =>{

            try {
                const turnos = await TipoTurno.find({}).populate('usuario')
                console.log(turnos);
                return turnos;
            } catch (error) {
                
            }

        }
    },
    
    Mutation:{

        nuevoUsuario: async (_, {input}) =>{
           // revisar si el usuario ya esta registrado

           const {rut, password} = input;

           const existeUsuario =  await Usuario.findOne({rut});
           console.log(existeUsuario);

           if (existeUsuario){
               throw new Error ('El usuario ya esta registrado')
           }


           // hasehar su password
           const salt = await bcryptjs.genSalt(10);
           input.password = await bcryptjs.hash(password, salt);

           //guardalo en la base de datos

           try {

            const usuario = new Usuario(input);
            usuario.save(); // guarda el usuario
            return usuario;
               
           } catch (error) {
               console.log(error);
               
           }
           

        },

        autenticarUsuario:  async(_, {input}) =>{

            //Si el usuario existe

            const {rut, password } = input;

            const existeUsuario = await Usuario.findOne({rut});

          

            if(!existeUsuario){
                throw new Error ('El usuario no existe');
            }

            // revisar si el password es correcto comparando con lo que se escribe en consola + el password
            // que esta hasehado

            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            if(!passwordCorrecto) {
                console.log(passwordCorrecto);
                throw new Error ('Password Incorrecto');
            }   

            

            // crear el token

            return{
                token: crearToken(existeUsuario, process.env.SECRETA, '24h')
                
            }
        },

        actualizarUsuario: async(_,{id, input})=>{


            let usuario = await Usuario.findById(id);

            const {password} = input;


             // hasehar su password
           const salt = await bcryptjs.genSalt(10);
           input.password = await bcryptjs.hash(password, salt);

            if(!usuario){
                throw new Error ('El usuario no existe');
            }

            //guardarlo en la base de datos

           usuario = await Usuario.findOneAndUpdate({_id: id}, input, {new:true} );

           return usuario;


        },

        eliminarUsuario: async (_,{id}) => {

            // se consulta si el usuario existe

            let usuario = await Usuario.findById(id);
           

            if(!usuario){
                throw new Error ('El usuario no existe');
            }

            // ELIMINANDO USUARIO

            await Usuario.findOneAndDelete({_id : id})


            return `Usuario Eliminado`

        },

        // Mutations Turnos

        nuevoTurno: async (_, {input}) =>{
          
          
            //guardalo en la base de datos

            try {
                const tipo_turno = new TipoTurno(input);
                tipo_turno.save(); // guarda el usuario
                return tipo_turno;
                
            } catch (error) {
                console.log(error)
            }
 
           
        }

      

      

        

        

    }
}

module.exports = resolvers;