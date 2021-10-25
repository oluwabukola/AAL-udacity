import React, {Component} from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';

class SearchInput extends Component{
    state ={
        value: '',
    }

    handleChange = event => {
        const {BookSearch} = this.props
        const newValue = event.target.value
        this.setState({ value: newValue }, () => {
            BookSearch(newValue)
        });
      };

    render(){
       const { updateShelf, books, bookSearch, shelfCategory,  SearchBook, BookSearch }= this.props
        return(
            <div className="search-books">
            <div className="search-books-bar">
            <Link to='/' onClick={this.props.resetSearch} className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text"  value={this.state.value}
                            onChange={this.handleChange}
                            placeholder="Search by title or author"/>
              </div>
            </div>
                <Search
                    books={books}
                    bookSearch={bookSearch}
                    updateShelf={updateShelf}
                    shelfCategory={shelfCategory}
                    BookSearch={this.BookSearch} 
                    
                />
            
          </div>
        )
    }
} 
export default SearchInput;