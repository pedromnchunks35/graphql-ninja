/* IMPORTS */
const express = require('express');
/* REQUIRE AN EXPRESS PACKAGE FOR UNDERSTAND GRAPHQL (WE NEED TO DESTRUCT IT OTHERWISE WE WILL PASS AN OBJECT) */
const { graphqlHTTP } = require('express-graphql');
/* IMPORT THE SCHEMA */
const {Schema} = require('./schema/schema');
/* IMPOORT MONGOOSE PACKAGE */
const mongoose = require('mongoose');
/* IMPORT CORS */
const cors = require('cors');


/* MAKE THE CONNECTION */
mongoose.connect("mongodb+srv://pedromn35:12341234@tutorial.nxrir2w.mongodb.net/?retryWrites=true&w=majority",()=>{
console.log('Mongoose bridged maded');    
});
/* CHECK IF THE CONNECTION WAS MADED */
mongoose.connection.once('open',()=>{
console.log('Connection is setted up');
})

/* CREATE APP */
const app = express();

/* ALLOW CROSS-ORIGIN REQUESTS */
app.use(cors());
/* SAY TO USE THAT GRAPHQL REQUEST HANDLER IN THAT ROUTE */
/* WE NEED TO PASS SOME OPTIONS IN GRAPHQL */
app.use('/graphql',graphqlHTTP({
    /* PUT THE SCHEMA */
    schema: Schema,
    graphiql: true
}));

/* CREATE AN PORT TO OUR APP , SECOUND PARAMETER IS FOR RUNNING SOMETHING IN CALLBACK */
app.listen(4000,()=>{
console.log('Now listening for request in port 4000')    
});

