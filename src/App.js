import React from 'react'
 //import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route,BrowserRouter as Router, Switch } from 'react-router-dom';
import SearchInput from './SearchInput';
import {getAll, update, search} from './BooksAPI';
import BookContainer from './BookContainer';

const shelfCategory =[
              {id:'currentlyReading',  name:'Currently Reading' },
                {id:'read', name:'Read'},
                {id:'wantToRead', name:'Want to Read'}
            ]

class BooksApp extends React.Component {
  
  constructor(props){
    super(props);
  this.state = {
    
    // showSearchPage: false,
    books: [],
    bookSearch: [],
    
  }}

componentDidMount(){
        
  getAll().then(data =>{

    this.setState({
      books: data
    })
    
  } )    
}

updateShelf = (book, shelf) => {
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

// handleChange = event => {
//   const newValue = event.target.value
//   this.setState({ value: newValue }, () => {
//       this.BookSearch(newValue)
//   });
// };

  render() {
  
    return (
      
      <div className="app">
   

   <Route path="/"  exact render={()=> (
        <BookContainer
             books={this.state.books}
            updateShelf={this.updateShelf}
            shelfCategory={shelfCategory}               

          />
      )}/>  
      <Route path="/search" exact render={()=> (
        <SearchInput
                  books={this.state.books}
          bookSearch={this.state.bookSearch}
               updateShelf={this.updateShelf}
               shelfCategory={shelfCategory}
                 BookSearch={this.BookSearch} 
                 resetSearch={this.resetSearch}                 

          />
      )}/>    
         
         
         
      </div>
      
     
    )
  }
}

export default BooksApp
