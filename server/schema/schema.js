const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql

const books = [
    { id: "1", name: "book 1", genre: "horror", authorId: "2" },
    { id: "2", name: "book 2", genre: "action", authorId: "1" },
    { id: "3", name: "book 3", genre: "history", authorId: "3" },
    { id: "4", name: "book 4", genre: "fiction", authorId: "2" },
    { id: "5", name: "book 5", genre: "romance", authorId: "2" },
    { id: "6", name: "book 6", genre: "comic", authorId: "3" },

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
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find(author => author.id === parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(book => book.authorId === parent.id)
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return books.find(book => book.id === args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return authors.find(author => author.id === args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})