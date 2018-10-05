### Basic usage of JWT with Node api's

### How to run
1. npm install
2. nodemon

This will bring up the server on port 5000. Open http://localhost:5000/api and you should see a json response
{
  message: 'Welcome to Basic Node, JWT Auth API demo'
}


Use postman and fire a POST request to /api/login that will generate a jwt token and send you a response with 30sec expiration.

Now fire a POST request to /api/posts and add token as a header

token: <access_token>

and you will receive a response as

{
  message: 'Created',
  data: {
    ...
  }
}

After 30sec you the request is forebidden again as we have the jwt expiration time to be only 30sec from the issuing time.

Clone and play with it.
