const { ApolloServer, gql} = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers')
const conectarDB = require('./config/db');
require('dotenv').config({path: 'variables.env'});
const jwt = require('jsonwebtoken');

//conectar a la base de datos

conectarDB();



//servidor

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({req})=>{

        console.log(req.headers);

        const token = req.headers['authorization'] || '';
        if(token){
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);
                console.log(usuario);
                return{
                    usuario
                }
            } catch (error) {
                console.log('hubo un error');
                console.log(error);
            }
        }
    }
    
    
    
});

//arrancar servidor de apollo para realizar nuestras consulta para backend

server.listen().then ( ({url}) => {
    console.log(`Servidor listo en la URL ${url}`)    
})