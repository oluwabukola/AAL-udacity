import React, {Component} from 'react';
import BookLayout from './BookLayout';

class Search extends Component{

    
    render(){

        const { books, bookSearch, updateShelf } = this.props;

        const bookUpdate = bookSearch.map(book => {
            books.map(c => {
                if (c.id === book.id) {
                    book.shelf = c.shelf
                }
                return c;
            })
            return book;
        });

        return (
            <div className="search-books-results">
              <ol className="books-grid">
              {bookUpdate.map(book => (
                            <BookLayout
                                book={book}
                                key={book.id}
                                category={book.shelf ? book.shelf : 'none'}
                                updateShelf={updateShelf}                               
                            />
                        ))}
              </ol>
            </div>
        )
    }
}
export default Search;