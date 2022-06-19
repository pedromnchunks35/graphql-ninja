import React, { Component, useEffect, useState } from 'react'

/* IMPORT OUR GQL */
import {useQuery,useMutation} from '@apollo/client';
/* IMPORT THE QUERY */
import {getAuthorsQuery,addBook,getBooksQuery} from '../queries/queries';
/* THE HOOK */
const Addbook = () =>{
/* FORM GET */
const[_formstate,_setForm]=useState({
  name: '',
  genre: '',
  authorId: ''
});
/* THE MUTATION CALLER */
const [createBooks, { data_mut, loading_mut, error_mut }] = useMutation(addBook);


/* MAKE THE QUERY AND DESTRUCT IT */
const { loading, error, data } = useQuery(getAuthorsQuery);
/* IF IT IS LOADING */
if (loading) return <p>Loading...</p>;
/* IF IT TROHWS AN ERROR */
if (error) return <p>Error :</p>;

/* SUBMIT FUNCTION */
const submit = async (e) =>{
    /* PREVENT THE REFRESH */
    e.preventDefault();  
    /* MAKE THE MUTATION */
    /* FUNCTION DERIVED BY THE USE MUTATION UP */
    createBooks({
      /* variables */
      variables:{
      name: _formstate.name,
      genre: _formstate.genre,
      authorId: _formstate.authorId  
      },
      /* refetch the data that we put on our list */
      refetchQueries: [{query: getBooksQuery}]
    });
    alert('Sucess');
    }

return (
<div>
{/* FORM ADD BOOK */}
<form id="add-book" onSubmit={submit}>
        {/* div 1 */}
        <div className="field">
        {/* label */}
          <label>Book name:</label>
          {/* INPUT BOX */}
          <input type="text"  onChange={(e)=>{_setForm({..._formstate,name: e.target.value})}}/>
        </div>
        {/* div 2 */}
        <div className="field">
          {/* label */}
          <label>Genre:</label>
          {/* INPUT BOX */}
          <input type="text" onChange={(e)=>_setForm({..._formstate,genre: e.target.value})}/>
        </div>
        {/* div 3 */}
        <div className="field">
          {/* label */}
          <label>Author:</label>
          <select onChange={(e)=>_setForm({..._formstate,authorId: e.target.value})}>
            {/* MAPPING OF OPTIONS */}
            <option>Select the author</option>
            {
            /* MAPPING THE DATA TO GET THE NAME OF THE AUTHORS */
            
            data.authors.map(({name,id})=>{
            /* RETURN THE OPTIONS */
            return <option key={id} value={id}>{name}</option>
            })
            }
          </select>
        </div>

        <button>+</button>

      </form>
</div>
)

}


/* EXPORT IT */
export default Addbook;