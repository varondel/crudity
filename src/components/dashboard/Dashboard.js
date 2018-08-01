import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import { LOCAL_STRAGE_KEY } from '../../utils/Settings'

// API
import * as MyAPI from '../../utils/MyAPI'
//Recipe
import Recipe from './Recipe'

class Dashboard extends Component {

  logoutRequest = () => {

    const { user } = this.props

    const param = {
      login_token: user.login_token
    }

    MyAPI.logout(param)
    .then((results) => {
      localStorage.removeItem(LOCAL_STRAGE_KEY);
      this.props.history.push("/")
    })
    .catch((err) => {
      console.log("err: ", err)
      localStorage.removeItem(LOCAL_STRAGE_KEY);
      this.props.history.push("/")
    })
  }


  newRecipeRequest = () => {
    this.props.history.push('create_recipe_form')
  }

  render() {

    const recipes = this.props.recipesState.recipes
    
    return(
      <Container textAlign='left'>

        <div style={{marginTop:60, block:'inlineBlock'}}>
          <a style={{cursor: 'pointer'}} onClick={() => this.newRecipeRequest()}>New recipe</a>
          <div style={{textAlign: 'right'}}>
            <a style={{cursor: 'pointer'}} onClick={() => this.logoutRequest()}>logout</a>
          </div>
        </div>

        <div>
          {
            recipes.length > 0 &&
            recipes.map((value, key) => 
              <Recipe key={key} data={value}/>
            )
          }
        </div>
    
        

      </Container>
    )
  }
}

// react-redux
function mapStateToProps ( {user, recipes} ) {
  return {
    user,
    recipesState : recipes
  }
}

// export default withRouter(MainPage);
export default withRouter( connect( mapStateToProps )(Dashboard) )
