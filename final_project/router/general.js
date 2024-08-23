const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));

//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    // res.send(books[isbn]);

  // Check if the book with the given ISBN exists
    const book = books[isbn];
    if (book) {
        // Return the book information if found
        return res.status(200).json(book);
    } else {
        // Return a 404 error if the book is not found
        return res.status(404).json({ message: "Book not found" });
    }
//   return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    // Extract the author parameter from the request URL
    const author = req.params.author;

    // Obtain all keys for the 'books' object
    const bookKeys = Object.keys(books);

    // Filter the books by author
    let filtered_books = bookKeys.map(key => books[key]).filter(book => book.author === author);

    // Check if any books were found for the given author
    if (filtered_books.length > 0) {
        // Send the filtered_books array as the response to the client
        res.send(filtered_books);
    } else {
        // If no books were found, send a 404 response with a message
        res.status(404).json({ message: "No books found by this author" });
    }
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;

    // Obtain all keys for the 'books' object
    const bookKeys = Object.keys(books);

    // Filter the books by author
    let filtered_books = bookKeys.map(key => books[key]).filter(book => book.title === title);

    // Check if any books were found for the given author
    if (filtered_books.length > 0) {
        // Send the filtered_books array as the response to the client
        res.send(filtered_books);
    } else {
        // If no books were found, send a 404 response with a message
        res.status(404).json({ message: "No books found with this title" });
    }
//   return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
