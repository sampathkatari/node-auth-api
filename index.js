const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secret = 'mysecret';
const port = 5000;

//Sample Hello world 
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to Basic Node, JWT Auth API demo'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    //Now we can access the token here as verifyToken adds up token in the request from the header
    jwt.verify(req.token, secret, (err, data) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Created',
                data
            });
        }
    })
});

app.post('/api/login', (req, res) => {
    //Mock user for now. But this will go with the user from db in your case
    const user = {
        id: 1,
        username: 'sampath',
        email: 'sampath@gmail.com'
    }
    //Added expires in 30sec. For more options on signing ref: https://www.npmjs.com/package/jsonwebtoken
    jwt.sign({ user }, secret, { expiresIn: '30s'}, (err, token) => {
        res.json({
            token
        });
    });
});

//Sending token as a header that you store in your localstorage or cookies
//token: <access_token>

function verifyToken(req, res, next) {
    const token = req.headers['token'];
    if (token) {
        req.token = token;
        next();
    } else {
        res.sendStatus(403);
    }
}

//Start the server on port
app.listen(port, () => {
    console.log(`server started on port: ${port}`)
});