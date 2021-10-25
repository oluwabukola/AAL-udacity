import React, {Component} from 'react';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';
 class BookContainer extends Component{

    static propTypes = {
        books : PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired, 
        shelfCategory: PropTypes.array.isRequired  
    }
render(){
    const { books,  shelfCategory, updateShelf  } = this.props;
    return(

        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          
      {shelfCategory.map( category => 
                 <BookShelf shelfCategory={shelfCategory} 
                 books={books} 
                 key={category.id}
                 category ={category}
                 updateShelf={updateShelf} />
                 )} 
        
                           
          </div>
        </div>
        {/* <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div> */}
      </div>
    )
}
 }
 export default BookContainer;