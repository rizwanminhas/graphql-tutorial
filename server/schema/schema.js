const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql

const books = [
    {id: "1", name:"book 1", genre: "horror"},
    {id: "2", name:"book 2", genre: "action"},
    {id: "3", name:"book 3", genre: "history"},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                const result =  books.filter(book => book.id === args.id)
                return result.length > 0 ? result[0] : null       
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})