// you can change the port number at server/index.js
const api = "http://localhost:4002"

const API_KEY = '__api_key__'

const headers = {
  'Accept': 'application/json',
  'Authorization': API_KEY
}

// create an account
export const createAccount = (params) =>
  fetch(`${api}/create_user`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())

// signin
export const signinWithPassword = (params) =>
  fetch(`${api}/login_with_email_password`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())


// upload
export const upload = (data) =>
  fetch(`${api}/files`, {
    method: 'POST',
    body: data
  }).then(res => res.json())

// signin with token
export const signinWithToken = (params) =>
  fetch(`${api}/login_with_token`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())

// logout
export const logout = (params) =>
  fetch(`${api}/logout`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())

// create recipe
export const createRecipe = (params) =>
  fetch(`${api}/create_recipe`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())

// update recipe
export const updateRecipe = (params) =>
  fetch(`${api}/update_recipe`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())

  // delete recipe
export const deleteRecipe = (params) =>
fetch(`${api}/delete_recipe`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( params )
}).then(res => res.json())

// fetch recipes from backend
export const fetchRecipes = (params) =>
  fetch(`${api}/fetch_recipes`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())
