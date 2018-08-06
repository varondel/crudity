import store from './../store'
import { setRecipesRedux } from './../actions/UserActions'

// you can change the port number at server/index.js
const api = "http://localhost:4002"

const API_KEY = '__api_key__'

const headers = {
  'Accept': 'application/json',
  'Authorization': API_KEY
}

export const fetchApi = (params, requestName) => 
  fetch(`${api}/${requestName}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())

export const fetchRecipes = () => 
  new Promise((resolve, reject) => {
    const { user } = store.getState()
      
    const param = {
      userId: user.user._id
    }

    fetchApi(param, 'fetch_recipes')
    .then((result) => {
      store.dispatch(setRecipesRedux({ params: result.recipes}))
      resolve()
    })
  })
