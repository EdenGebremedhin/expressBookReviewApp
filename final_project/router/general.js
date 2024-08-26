const express = require('express');
let books = require("./booksdb.js");
// let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    return userswithsamename.length > 0;
} 

public_users.post("/register", (req, res) => {
    // Extract username and password from request body
    const username = req.query.username;
    const password = req.query.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(400).json({ message: "User already exists!" });
        }
    }
    // Return error if username or password is missing
    return res.status(400).json({ message: "Unable to register user. Username and password required." });
});



// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//     res.send(JSON.stringify(books,null,4));
// });

public_users.get('/', function (req, res) {
    // Simulating an async call with a promise
    const getBooks = new Promise((resolve, reject) => {
        if (books) {
            resolve(books);
        } else {
            reject("Books not found");
        }
    });

    getBooks
        .then((booksList) => {
            res.status(200).json(booksList);
        })
        .catch((error) => {
            res.status(500).json({ message: "Error fetching book list", error });
        });
});









// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//     const isbn = req.params.isbn;
//     // res.send(books[isbn]);

//   // Check if the book with the given ISBN exists
//     const book = books[isbn];
//     if (book) {
//         // Return the book information if found
//         return res.status(200).json(book);
//     } else {
//         // Return a 404 error if the book is not found
//         return res.status(404).json({ message: "Book not found" });
//     }
// //   return res.status(300).json({message: "Yet to be implemented"});
//  });



// Get book details based on ISBN using async-await
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;

    try {
        // Simulate an async operation using a Promise to get the book details
        const getBookByISBN = async (isbn) => {
            return new Promise((resolve, reject) => {
                const book = books[isbn];
                if (book) {
                    resolve(book);
                } else {
                    reject("Book not found");
                }
            });
        };

        const bookDetails = await getBookByISBN(isbn);
        res.status(200).json(bookDetails);
    } catch (error) {
        res.status(404).json({ message: error });
    }
});


  
// Get book details based on author
// public_users.get('/author/:author', function (req, res) {
//     // Extract the author parameter from the request URL
//     const author = req.params.author;

//     // Obtain all keys for the 'books' object
//     const bookKeys = Object.keys(books);

//     // Filter the books by author
//     let filtered_books = bookKeys.map(key => books[key]).filter(book => book.author === author);

//     // Check if any books were found for the given author
//     if (filtered_books.length > 0) {
//         // Send the filtered_books array as the response to the client
//         res.send(filtered_books);
//     } else {
//         // If no books were found, send a 404 response with a message
//         res.status(404).json({ message: "No books found by this author" });
//     }
// });

// Get book details based on Author using async-await
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;

    try {
        // Simulate an async operation to get the books by author using a Promise
        const getBooksByAuthor = async (author) => {
            return new Promise((resolve, reject) => {
                const bookKeys = Object.keys(books);
                let filteredBooks = bookKeys.map(key => books[key]).filter(book => book.author === author);

                if (filteredBooks.length > 0) {
                    resolve(filteredBooks);
                } else {
                    reject("No books found by this author");
                }
            });
        };

        const booksByAuthor = await getBooksByAuthor(author);
        res.status(200).json(booksByAuthor);
    } catch (error) {
        res.status(404).json({ message: error });
    }
});



// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//     const title = req.params.title;

//     // Obtain all keys for the 'books' object
//     const bookKeys = Object.keys(books);

//     // Filter the books by title
//     let filtered_books = bookKeys.map(key => books[key]).filter(book => book.title === title);

//     // Check if any books were found for the given title
//     if (filtered_books.length > 0) {
//         // Send the filtered_books array as the response to the client
//         res.send(filtered_books);
//     } else {
//         // If no books were found, send a 404 response with a message
//         res.status(404).json({ message: "No books found with this title" });
//     }

// });



// Get book details based on Title using async-await
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;

    try {
        // Simulate an async operation to get books by title using a Promise
        const getBooksByTitle = async (title) => {
            return new Promise((resolve, reject) => {
                const bookKeys = Object.keys(books);
                let filteredBooks = bookKeys.map(key => books[key]).filter(book => book.title === title);

                if (filteredBooks.length > 0) {
                    resolve(filteredBooks);
                } else {
                    reject("No books found with this title");
                }
            });
        };

        const booksByTitle = await getBooksByTitle(title);
        res.status(200).json(booksByTitle);
    } catch (error) {
        res.status(404).json({ message: error });
    }
});











//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    // Extract the ISBN parameter from the request URL
    const isbn = req.params.isbn;

    // Check if the book with the given ISBN exists
    if (books[isbn]) {
        // Retrieve the reviews for the book
        const reviews = books[isbn].reviews;

        // Send the reviews as the response
        res.send(reviews);
    } else {
        // If the book with the given ISBN does not exist, send a 404 response
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;