# About
A simple GraphQL app in NodeJS for learning purposes.

# How to run?
1. navigate to the `server` directory.
2. execute `node app.js`
3. open `http://localhost:3000/graphql` in a browser. (This is available because in `app.js` I enabled `graphiql`)
4. make a graphql query like 
    ```json
    {
        book(id: 2) {
            name
            author{
                name
                age
            }
        }
    }
    ```

# Random Notes
1. For `BookType` and `AuthorType` the `fields` is defined using a *function* instead of an *object*. The reason is we want to lazy evaluate the fields otherwise we will have errors about undefined fields e.g. if I had used *object* and the I would have gotten an error about missing `AuthType` (because `BookType` depends on `AuthType` but `AuthType` is declared after `BookType`).