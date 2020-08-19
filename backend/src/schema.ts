
import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt} from 'graphql'
import _ from 'lodash'

import fs from 'fs'



// const knexConfig = require("../knexfile")
let news2 =fs.readFileSync('../news.json')
let newsdata =JSON.parse(news2.toString())
console.log(newsdata[0].id)
console.log(newsdata[0].weblink)






    const NewsType =new GraphQLObjectType({
        name:"News",
        fields:()=>({
            id:{type:GraphQLInt},
            title:{type:GraphQLString},
            points:{type:GraphQLString},
            author:{type:GraphQLString},
            time:{type:GraphQLString},
            numberofcomment:{type:GraphQLString},
            weblink:{type:GraphQLString}
        })
    })

    const RootQuery =new GraphQLObjectType({
        name:'RootQueryType',
        fields:{
            news:{
                type:NewsType,
                args:{id:{type:GraphQLInt}},
                 resolve(parent,args){
                    return _.find(newsdata ,{id:args.id})           
                    }
                
            },
            newlist:{
                type:new GraphQLList(NewsType),
                
                resolve(parentvalue,args){
                  
                    return newsdata
                }
            }
        }
    })
//})()


export const schema =new GraphQLSchema({
    query:RootQuery
})
