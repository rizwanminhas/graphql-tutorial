import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

function BookList() {
    console.log(this)
    return (
        <div>
            <ul id="book-list">
                <li>Book name</li>
            </ul>
        </div>
    )
}

export default graphql(getBooksQuery)(BookList)
