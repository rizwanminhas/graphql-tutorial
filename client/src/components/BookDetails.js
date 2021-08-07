import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getBookQuery = gql`
    query($id: ID) {
        book(id: $id) {
            name
            id
            genre
            author {
                name
            }
        }
    }
`
function BookDetails(props) {
    function displayBookDetails() {
        const { book } = props.data
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                </div>
            )
        } else {
            return (
                <div>No book selected</div>
            )
        }
    }
    return (
        <div id="book-details">
            {displayBookDetails()}
        </div>
    )
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)
