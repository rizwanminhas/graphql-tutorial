import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import React, { useState } from 'react'

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`
function AddBook(props) {
    const [book, setBook] = useState({ name: "", genre: "", authorId: "" });

    function displayAuthors() {
        if (props.data.loading)
            return (<option disabled>loading...</option>)
        else
            return props.data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(book)
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

export default graphql(getAuthorsQuery)(AddBook)
