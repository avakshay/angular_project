import React, { useState } from "react";
import Pagination from "react-js-pagination";

const PaginatedContent = () => {
  // Data to be rendered using pagination.
   const todos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
   const todosPerPage = 3;
   const [ activePage, setCurrentPage ] = useState( 1 );

   // Logic for displaying current todos
   const indexOfLastTodo  = activePage * todosPerPage;
   const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
   const currentTodos     = todos.slice( indexOfFirstTodo, indexOfLastTodo );

   const renderTodos = currentTodos.map( ( todo, index ) => {
      return <li key={ index }>{ todo }</li>;
   } );

   const handlePageChange = ( pageNumber ) => {
      console.log( `active page is ${ pageNumber }` );
      setCurrentPage( pageNumber )
   };
console.log(renderTodos);
   return (
      <div>
         <div className="result">
            { renderTodos }
         </div>
         <div className="pagination">
            <Pagination
             prevPageText='prev'
             nextPageText='next'
               activePage={ activePage }
               itemsCountPerPage={ 3 }
               totalItemsCount={ todos.length }
               pageRangeDisplayed={ 3 }
               onChange={ handlePageChange }
            />
         </div>
      </div>
   )

}

export default PaginatedContent;