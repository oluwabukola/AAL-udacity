import React, { Component } from 'react';
import BookLayout from './BookLayout';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

class BookShelf extends Component{
    constructor(props){
        super(props)
    }

      static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired  
      
    }
    
render(){
    const { books,  category, updateShelf } = this.props;
    
    const SelectedShelf = books.filter(book =>{
      return book.shelf === category.id 
    });
     
    return(
        <div className="bookshelf">
        <h2 className="bookshelf-title">{category.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
         
          {SelectedShelf.map(book => (
                <BookLayout book={book} key={book.id} category={category.id} updateShelf={updateShelf} />
              ))}
          
          </ol>
        </div>
        <div className="open-search">
           <Link to='/search'>Add a book</Link>
          </div>
      </div>
    )
}

}

export default BookShelf;