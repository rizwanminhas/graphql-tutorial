const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql

const books = [
    { id: "1", name: "book 1", genre: "horror" },
    { id: "2", name: "book 2", genre: "action" },
    { id: "3", name: "book 3", genre: "history" },
]

const authors = [
    { id: "1", name: "author 1", age: 30 },
    { id: "2", name: "author 2", age: 40 },
    { id: "3", name: "author 3", age: 50 },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                const result = books.filter(book => book.id === args.id)
                return result.length > 0 ? result[0] : null
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                const result = authors.filter(author => author.id === args.id)
                return result.length > 0 ? result[0] : null
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})