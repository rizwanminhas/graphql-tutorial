import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import BookDetails from './BookDetails'
import React, { useState } from 'react'

export const getBooksQuery = gql`
    {
        books {
            name
            id
            genre
        }
    }
`
function BookList(props) {
    const [selectedBook, setSelectedBook] = useState(null)

    function displayBooks() {
        if (props.data.loading)
            return (<div>loading...</div>)
        else
            return props.data.books.map(book => {
                return (
                    <li key={book.id} onClick={(e) => setSelectedBook(book.id)}>{book.id} - {book.name} - {book.genre}</li>
                )
            })
    }

    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookId={selectedBook} />
        </div>
    )
}

export default graphql(getBooksQuery)(BookList)
