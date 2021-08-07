import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

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
    function displayBooks() {
        if (props.data.loading)
            return (<div>loading...</div>)
        else
            return props.data.books.map(book => {
                return (
                    <li key={book.id}>{book.id} - {book.name} - {book.genre}</li>
                )
            })
    }

    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
        </div>
    )
}

export default graphql(getBooksQuery)(BookList)
