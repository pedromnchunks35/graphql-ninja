/* IMPORT OUR GQL */
import {gql} from '@apollo/client';
/* OUR QUERY */
const getBooksQuery = gql`
query GetBooks{
books{
name
id    
}
}
`

/* OUR QUERY */
const getAuthorsQuery = gql`
query GetAuthors{
authors{
name
id  
}
}
`
/* ADD BOOK MUTATION */
const addBook = gql`
  mutation addBook($name: String!,$genre: String!,$authorId: ID!) {
    addBook(name: $name,genre: $genre, authorId: $authorId) {
      name
      genre
    }
  }
`;

/* GET BOOK QUERY */
const getBook = gql`
query book($id: ID!){
  book(id: $id){
  id
  name
  genre
  author{
  name
  age
  book{
  id
  name
  genre  
  }
  }
  } 
  }
`



/* EXPORT IT */
export {getBooksQuery,getAuthorsQuery,addBook,getBook};