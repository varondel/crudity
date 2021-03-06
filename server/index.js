const port = 4002

import express from 'express'

import session from 'express-session'

const app = express()

import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() );

app.use(session({
  secret: 'my session',
  resave: true,
  saveUninitialized: false,
}))


const api = require('./routes/api');

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// get for test
app.get('/', api.echo);

app.post('/', api.echo);

//user
app.post('/create_user', api.create_user);
app.post('/login_with_email_password', api.login_with_email_password);
app.post('/login_with_token', api.login_with_token);
app.post('/logout', api.logout);

//recipes
app.post('/create_recipe', api.create_recipe);
app.post('/update_recipe', api.update_recipe);
app.post('/delete_recipe', api.delete_recipe);
app.post('/fetch_recipes', api.fetch_recipes);

app.listen(port);
console.log('Listening on port '+port+'...');
