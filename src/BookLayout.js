import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BookLayout extends Component{

    static propTypes = {
        // books : PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired   
    }

    state={
            value: this.props.category
    }

    handleChange = (event) => {
        const newValue = event.target.value;

        this.setState({
            value: newValue
        });

    const {updateShelf} = this.props;
    updateShelf(this.props.book, newValue)
    }

    render(){
        const{book, updateShelf} = this.props;

        console.log('update shelf', updateShelf);
      
        const { value } = this.state;
        
        return(
      
        <div className="bookshelf-books">
          <ol className="books-grid">
            <li>
            <div className="book">
                <div className="book-top">                        
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})` : ''}}></div>
                    <div className="book-shelf-changer">
                    <select value={value} onChange={this.handleChange}  >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
            </li> 
           
            </ol>
        </div>
    
    
      
        )
    }
}

export default BookLayout;
