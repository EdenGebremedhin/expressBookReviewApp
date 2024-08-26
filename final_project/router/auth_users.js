const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];


const authenticatedUser = (username, password) => {
   let validUsers = users.filter((user) => {
    return user.username === username && user.password === password
});

    if (validUsers.length > 0) {
        return true;
    } else {
        return false;
    }
};

regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({ data: username }, 'access', { expiresIn: 60 * 60 });

        req.session.authorization = { accessToken, username 
        };
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(401).json({ message: "Invalid Login. Check username and password" });
    }
});
 

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review; // Get review from query parameters
    const username = req.session.authorization ? req.session.authorization.username : null;

    if (!isbn || !review) {
        return res.status(400).json({ message: "ISBN and review are required." });
    }

    if (!username) {
        return res.status(401).json({ message: "Unauthorized. Please log in to add a review." });
    }

    const book = books[isbn];
    if (!book) {
        return res.status(404).json({ message: "Book not found." });
    }

    // If the book exists, check if the user already posted a review
    if (!book.reviews) {
        book.reviews = {};
    }

    // Check if the user has already posted a review, update it if they have
    book.reviews[username] = review;

    return res.status(200).json({ message: `Review successfully added/updated by ${username}.`, reviews: book.reviews });
});


regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization ? req.session.authorization.username : null;

    // Check if the book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Check if the user is logged in
    if (!username) {
        return res.status(403).json({ message: "User not logged in" });
    }

    let bookReviews = books[isbn].reviews;

    // Check if the user has posted a review
    if (!bookReviews[username]) {
        return res.status(404).json({ message: "No review found from this user to delete" });
    }

    // Delete the review
    delete bookReviews[username];

    return res.status(200).json({ message: "Review deleted successfully" });
});


module.exports.users = users;
module.exports.customers = regd_users;