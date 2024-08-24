const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// const isValid = (username)=>{ //returns boolean
// //write code to check is the username is valid
// }

const authenticatedUser = (username, password) => {
    return users.some(user => user.username === username && user.password === password);
};

regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({ data: password }, 'access', { expiresIn: 60 * 60 });
        req.session.authorization = { accessToken, username };
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(401).json({ message: "Invalid Login. Check username and password" });
    }
});
 

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
