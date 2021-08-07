import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import * as compose from 'lodash.flowright';
import React, { useState } from 'react'
import { getBooksQuery } from './BookList';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            id
            name
        }
    }

`

function AddBook(props) {
    const [book, setBook] = useState({ name: "", genre: "", authorId: "" })

    function displayAuthors() {
        if (props.getAuthorsQuery.loading)
            return (<option disabled>loading...</option>)
        else
            return props.getAuthorsQuery.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.addBookMutation({
            variables: {
                name: book.name,
                genre: book.genre,
                authorId: book.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        })
    }

    return (
        <div>
            <form id="add-book" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e) => setBook({ ...book, name: e.target.value })} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e) => setBook({ ...book, genre: e.target.value })} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => setBook({ ...book, authorId: e.target.value })} >
                        <option>select author</option>
                        {displayAuthors()}
                    </select>
                </div>
                <button>Add book</button>
            </form>
        </div>
    )
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)
