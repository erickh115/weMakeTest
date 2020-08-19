import express from 'express'
import  {schema} from './schema'
import {graphqlHTTP} from 'express-graphql'
// import knex from 'knex'

const app =express();



app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))




    app.listen({port :8000},()=>{
        console.log(`Server ready for Graphql at http://localhost:8000`)
    })
