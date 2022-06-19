/* REQUIRE THE GRAPHQL */
const graphql = require('graphql');
// Load the full build.
var _ = require('lodash');
/* IMPORT MONGO MODELS */
const {book_model} = require('../mongo-models/book');
const {author_model} = require('../mongo-models/author');


/* DESTRUCTURE THE OBJECT */
const {GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull} = graphql;

/* var dummydata=
    [
    {name: 'Stocks' , genre: 'Economics' , id: 1,authorId:1 },   
    {name: 'Harry Potter', genre: 'Fantasy' , id: 2,authorId:2} ,
    {name: 'Ricardo, o ladrao', genre: 'Terror' , id: 3,authorId:3},
    {name: 'Passos, o ladrao', genre: 'Comedia' , id: 4,authorId:2},
    {name: 'Bruno, o ladrao', genre: 'Suspance' , id: 5,authorId:1},
    {name: 'Donquixote, o ladrao', genre: 'Tristeza' , id: 6,authorId:3},

    ]

var dummydata_authors=
[
    {name: 'Albert' , age: 22 , id: 1 },   
    {name: 'Harry Potter', age: 33 , id: 2} ,
    {name: 'Ricardo, o ladrao', age: 40 , id: 3}  
] */

/* OBJECT TYPE */
const BookType = new GraphQLObjectType({
  /* NAME OF THE OBJECT */
  name: 'Book',
  /* HIS FIELDS */
  fields: () => ({
      /* THE FIELDS AND THE TYPES WHICH WILL NEED TO BE RETRIEVED FROM THE LIBRARY (GRAPHQLINT(int) or GraphQLString(string)) */
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      genre: {type: GraphQLString},
      author:{
          type: AuthorType,
          /* THE PROPERTIES OF BOOK IS IN PARENT */
          resolve(parent,args){
          /* WE WILL RESOLVE THEN THE AUTHORS PROPERTIES BY HIS ID */
          /* return _.filter(dummydata_authors,{id: parent.authorId});  */
          return author_model.findById(parent.authorId);
          }
      }
  })
});


/* OBJECT TYPE */
const AuthorType = new GraphQLObjectType({
    /* NAME OF THE OBJECT */
    name: 'Author',
    /* HIS FIELDS */
    fields: () => ({
        /* THE FIELDS AND THE TYPES WHICH WILL NEED TO BE RETRIEVED FROM THE LIBRARY (GRAPHQLINT(int) or GraphQLString(string)) */
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    book: {
    /* RELATION TYPE BOOKTYPE */
    type: new GraphQLList(BookType),
    /* RELATION HANDLER */
    /* PARENT WILL HAVE THE AUTHOR PROPERTIES */
    resolve(parent,args){
       /*  return _.filter(dummydata,{authorId: parent.id}); */
       return book_model.find({authorId: parent.id})
    }
    }
    })
})


/* ROOT QUERY entry point*/
const Rootquery = new GraphQLObjectType({
    /* THE NAME OF THE ENTRY POINT */
    name: 'RootQueryType',
    /* FIELDS OF THE ENTRY POINT OF THE BOOKS */
    fields: {

    author:{
    type: AuthorType,
    /* HIS ARGS , WHICH BOOK TO RETURN (THIS ENTRY POINT IS AN INDIVIDUAL AUTHOR) */
    args:{
        id: {type: GraphQLID}
    },
    /* GET DATA FROM DB (ITS AIM ITS TO WORK WITH THE RELATIONS)*/
    /* THIS IS HOW IT WILL DEAL WITH THIS AUTHOR TYPE */
    /* ARGS WILL TAKE THE INPUT OF THE QUERY */
    resolve(parent,args){
    /* return _.find(dummydata_authors,{id: args.id}); */  
       return author_model.findById(args.id);  
    }
    },

    book:{
    type: BookType,
    /* HIS ARGS , WHICH BOOK TO RETURN (THIS ENTRY POINT IS AN INDIVIDUAL BOOK) */
    args: {
        id: {type: GraphQLID},
          },
    /* GET DATA FROM DB (ITS AIM ITS TO WORK WITH THE RELATIONS)*/
    /* THIS IS HOW IT WILL DEAL WITH THIS BOOK TYPE */
    /* ARGS WILL TAKE THE INPUT OF THE QUERY */
    resolve(parent,args){
    /* TESTING OUR SCHEMA WITH DUMMY DATA WHICH WILL BE LOADED BY LOADASH "_" */
    /* return _.find(dummydata,{id: args.id}); */
    return book_model.findById(args.id);
    }    

    },

    /* QUERY FOR RETRIEVE ALL BOOKS */
    books: {
    /* type is an list of type book */
    type: new GraphQLList(BookType),
    /* RETURN ALL BOOKS */
    resolve(parent,args){
    /* return dummydata */
    return book_model.find({});
    }
    },
    /* QUERY FOR RETRIEVE ALL AUTHORS */
    authors:{
        /* type is an list of type author */
        type: new GraphQLList(AuthorType),
        /* RETURN ALL AUTHORS */
        resolve(parent,args){
            /* return dummydata_authors */
        return author_model.find({});
        }
    }
    }
})



/* MUTATIONS FOR ADD OR CHANGE DATA */
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        /* FIELD TO ADD AUTHOR */
        addAuthor:{
            /* THE TYPE */
            type: AuthorType,
            /* THE ARGS OF THIS QUERY */
            args: {
            /* GRAPHQLNONULL IS FOR DONT ALLOW TO ADD INFORMATION IF THE FIELD IS EMPTY */
            name:  {type: new GraphQLNonNull(GraphQLString)},
            age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            /* THE HANDLING */
            resolve(parent,args){
                /* CREATE AN NEW AUTHOR WITH OUR AUTHOR MODEL FROM MONGODB */
                let author = new author_model({
                name: args.name,
                age: args.age});
                /* SAVE THE MODEL AND RETURN IT */
                return author.save();
            }
        },
        /* FIELD TO ADD BOOK */
        addBook:{
        /* THE TYPE */
        type: BookType,
        /* THE ARGS OF THIS QUERY */
        /* GRAPHQLNONULL IS FOR DONT ALLOW TO ADD INFORMATION IF THE FIELD IS EMPTY */
        args:{
            name: {type: new GraphQLNonNull(GraphQLString)},
            genre: {type: new GraphQLNonNull(GraphQLString)},
            authorId: {type: new GraphQLNonNull(GraphQLID)}
        },
        /* THE HANDLING */
        resolve(parent,args){
            /* CREATE AN NEW BOOK WITH OUR AUTHOR MODEL FROM MONGODB */
            let book = new book_model({
            name: args.name,
            genre: args.genre,
            authorId: args.authorId
            })
            /* SAVE THE MODEL AND RETURN IT */
            return book.save();
        }

        }
    }
})


/* EXPORT THE SCHEMA */
const Schema = new GraphQLSchema({
/* THE QUERYS */
query: Rootquery,
/* THE MUTATIONS */
mutation: Mutation
});
module.exports.Schema = Schema;