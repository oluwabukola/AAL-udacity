import React from 'react'
 //import * as BooksAPI from './BooksAPI';
import './App.css';
import Search from './Search';
import {getAll, update, search} from './BooksAPI';
import BookShelf from './BookShelf';

const shelfCategory =[
              {id:'currentlyReading',  name:'Currently Reading' },
                {id:'read', name:'Read'},
                {id:'wantToRead', name:'Want to Read'}
            ]

class BooksApp extends React.Component {
  
  constructor(props){
    super(props);
  this.state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    bookSearch: [],
    value: '',
  }}

componentDidMount(){
        
  getAll().then(data =>{

    this.setState({
      books: data
    })
    
  } )    
}

onUpdate = (book, shelf) => {
    update(book, shelf);

  // If the shelf is equals to none or the none is selected, filterout the book clicked
  if(shelf ==='none'){
    this.setState(prevState =>({      
      books: prevState.books.filter(c => c.id !== book.id)
    }));
  }else {
    book.shelf = shelf;
    this.setState(prevState => ({
      books: prevState.books.filter(c => c.id !== book.id).concat(book)
    }));
  }
}

BookSearch = (query) => {
  if (!(query.length < 1)) {
  search(query)
    .then((books) => {
      books.error 
      ?
      this.setState({
        bookSearch: [],
        })
        :
        this.setState({ bookSearch: books });    
    })
  } else {
    this.setState({
      bookSearch: [] 
      });
  }
console.log('booksearch before', this.state.bookSearch);
}

resetSearch = () => {
  this.setState({
    bookSearch: []
  })
}

handleChange = event => {
  const newValue = event.target.value
  this.setState({ value: newValue }, () => {
      this.BookSearch(newValue)
  });
};

  render() {
  
    // const { updateShelf, books, bookSearch, shelfCategory,  SearchBook }= this.props
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                <input type="text"  value={this.state.value}
                            onChange={this.handleChange}
                            placeholder="Search by title or author"/>
              </div>
            </div>
                <Search
                    books={this.state.books}
                    bookSearch={this.state.bookSearch}
                    updateShelf={this.updateShelf}
                    shelfCategory={shelfCategory}
                    BookSearch={this.BookSearch} 
                    resetSearch={this.resetSearch}                  
                />
            {/* <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div> */}
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                 
                {shelfCategory.map( category => 
                     <BookShelf shelfCategory={shelfCategory} 
                     books={this.state.books} 
                     key={category.id}
                     category ={category}
                     updateShelf={this.onUpdate} />
                     )}
                               
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
