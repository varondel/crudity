import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

// API
import * as MyAPI from '../utils/MyAPI'
import { LOCAL_STRAGE_KEY } from '../utils/Settings'

import { loginWithEmailRedux } from '../actions/UserActions'
import { setRecipesRedux } from '../actions/UserActions'

class Home extends Component {

  componentDidMount() {
    const storage_data = localStorage.getItem(LOCAL_STRAGE_KEY)
    if (!storage_data) {
      this.props.history.push('login')
      return;
    }

    const storage_json = JSON.parse(storage_data)
    if ( storage_json && storage_json.login_token ) {
      console.log("Sign in with token !")
      this.signinWithTokenRequest(storage_json.login_token)
    }
  }

signinWithTokenRequest = (login_token) => {
  // login with token

  const param = {
    login_token: login_token
  }

  MyAPI.fetchApi(param, 'login_with_token')
  .then((data) => {

    return new Promise((resolve, reject) => {

      if (data.status !== 'success'){
        reject('error')
      } else {
        // success
        const params = {
          user: data.user,
          login_token: data.login_token,
        }
        localStorage.setItem(LOCAL_STRAGE_KEY, JSON.stringify(params))
        this.props.mapDispatchToLoginWithPassword(params)
        resolve()
      }
    })
  })
  .then(() => {
    MyAPI.fetchRecipes()
      .then((result) => {
        this.props.history.push("dashboard")
      })
  })
  .catch((err) => {
    console.log("err:", err)
    localStorage.removeItem(LOCAL_STRAGE_KEY);
  })
}

  render() {

    return(
      <span></span>
    )
  }
}

// react-redux
function mapStateToProps ( {user} ) {
  return {
    user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    mapDispatchToLoginWithPassword: (data) => dispatch(loginWithEmailRedux({ params: data})),
    mapDispatchToSetRecipes: (data) => dispatch(setRecipesRedux({ params: data}))
  }
}

// export default withRouter(MainPage);
export default withRouter( connect( mapStateToProps, mapDispatchToProps )(Home) )
