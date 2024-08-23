const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here

const authHeader = req.headers['authorization'];
    
    // Check if the Authorization header is provided and has the Bearer token
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extract the token part (after 'Bearer ')
        const token = authHeader.split(' ')[1];
        
        // Verify the token using jsonwebtoken
        jwt.verify(token, "your_jwt_secret_key", (err, decoded) => {
            if (err) {
                // Token is invalid or expired
                return res.status(401).send("Invalid or expired token");
            } else {
                // Token is valid, store the decoded information in req.user
                req.user = decoded;
                next(); // Proceed to the next middleware or route handler
            }
        });
    } else {
        // If no token is provided, return an unauthorized response
        return res.status(401).send("Access Denied: No Token Provided");
    }


});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
