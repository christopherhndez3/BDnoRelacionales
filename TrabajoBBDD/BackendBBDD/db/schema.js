const { gql} = require('apollo-server');

//Schema
const typeDefs = gql`

#Modelo de usuario type
type Usuario {
    id: ID
    nombre: String
    rut: String
    telefono: String
    email: String
    direccion: String
    tipo_usuario: String
    password: String
  
  
}



#Este input es para registrar los usuario
input UsuarioInput{
    nombre: String!
    rut: String!
    telefono: String!
    email: String!
    direccion: String!
    tipo_usuario: String!
    password: String!
   
}

input UsuarioUpdateInput {
    nombre: String
    rut: String
    telefono: String
    email: String
    direccion: String
    tipo_usuario: String
    password: String
}


type Turno{
    id: ID
    turno_hora: String
    descripcion: String
    fechaCreacion: String
    usuario: Usuario
}

input TipoTurnoInput{
    turno_hora: String
    descripcion: String
    usuario: ID!

}

input InputFechaInicioFinal{
    fecha_inicio: String
    fecha_final: String
}


# aqui se crea un type para crear el token que nos servira para iniciar sesion
type Token{
    token: String
}

# aqui se crea solo los datos que se requiere para logear para luego usarlo en el input
type Login{
    rut: String
    password: String
   
   
}

# aqui se crea input para ingreso de autentificacion de usuario
input AutenticarInput{
    rut: String!
    password: String!
 
 
}



type Query{

    #USUARIO QUERY
    obtenerUsuario: Usuario
    obtenerTodosUsuario: [Usuario]
    obtenerUsuarioID(id: ID!): Usuario

    #TURNOS QUERY
    obtenerTodosUsuarioNormal: [Usuario]
    obtenerTurnos: [Turno]
    obtenerTurnosFecha(input: InputFechaInicioFinal): [Turno]
  
    
}


type Mutation{
    #USUARIO MUTACION
    nuevoUsuario(input: UsuarioInput) : Usuario
    autenticarUsuario(input: AutenticarInput) : Token
    actualizarUsuario(id: ID!, input: UsuarioUpdateInput): Usuario
    eliminarUsuario(id: ID!): String

    #TURNO MUTACION
    nuevoTurno(input: TipoTurnoInput): Turno

}

`;

module.exports = typeDefs;