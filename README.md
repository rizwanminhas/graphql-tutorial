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