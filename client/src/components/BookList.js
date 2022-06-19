import React, { useState } from 'react'

/* IMPORT OUR GQL */
import {useQuery} from '@apollo/client';
/* OUR QUERY */
import {getBooksQuery} from '../queries/queries'
/* BOOK DETAILS */
import { BookDetails } from './BookDetails';
/* COMPONENT BOOK LIST */
const BookList = () =>{
  
    /* USESTATE OF VAR CLICKED */
    const [_clicked,setClicked] = useState('');
    /* MAKE THE QUERY AND DESTRUCT IT */
    const { loading, error, data } = useQuery(getBooksQuery);
    /* IF IT IS LOADING */
    if (loading) return <p>Loading...</p>;
    /* IF IT TROHWS AN ERROR */
    if (error) return <p>Error :</p>;
    
    

    return (
      /* LIST DIV */
      <div >
      <div id='book-list'>
      <ul>
          {/* MAPPING ID AND NAME */}
          {data.books.map(({__typename,name,id}) =>{
          return (<div>
          {/* WE HAVE AN ONCLICK EVENT WHICH UPDATES THE STATE OF THE BOOK SELECTED BY THE USER */}
          <li key={id} onClick={(e)=>{setClicked({selected: id})}}>
          {/* RETURN OF THE FOLLOWING */} 
          {name}
    
          </li>
          </div>)

          })}
          </ul> 
          </div>
          {/* PASS THE SELECTED BOOK TO THE CHILD COMPONENT BOOK DETAILS */}
          <BookDetails bookId={_clicked}/>
      </div>
    )

}
/* EXPORT IT */
export default BookList