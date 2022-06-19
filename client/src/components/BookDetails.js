import React, { Component } from 'react'

/* IMPORT OUR GQL */
import {useQuery} from '@apollo/client';
/* OUR QUERY */
import {getBook} from '../queries/queries'
/* BOOK DETAILS HOOK */
/* THIS SELECTED ARGUMENT IS THE PROP THAT WE SEND BY THE BOOK LIST Component(THE PARENT) */
export const BookDetails = (Selected) => {
/*  THE QUERY THAT WE WANT TO USE */ 
 const{loading , error , data}= useQuery(getBook,{
     variables:{
     id: Selected.bookId.selected
     }
 });
/* FUNCTION TO DISPLAY BOOKS IF THEY EXIST */
 const display = () =>{
/*  if there is data */
  if(data){
/* RETURN SOME JSX */
 return(
 <div>
 
 <h2>{data.book.name}</h2> 
 <p>{data.book.genre}</p> 
 <p>{data.book.author.name}</p>
 <p>All books by this author</p>
 
 <ul className='other-books'>
 {
  data.book.author.book.map((book)=>{
  return <li key={book.id}>{book.name}</li>
  })
 }
 </ul>  

 </div>  
 )
 }else{
  /* CASE THERES NO BOOK SELECTED */
  return(
  <div>No book selected..</div>
  )

 }
 }



 /* RETURN BY THE HOOK THE FUNCTION DISPLAY UP  */
  return <div id='book-details'>{display()}</div>

}
