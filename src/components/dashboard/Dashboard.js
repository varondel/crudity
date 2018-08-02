import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Container, Button, Grid, Popup} from 'semantic-ui-react'

import { LOCAL_STRAGE_KEY } from '../../utils/Settings'

// API
import * as MyAPI from '../../utils/MyAPI'
//Recipe
import Recipe from './Recipe'
//Redux
import { setEditRecipeRedux } from '../../actions/UserActions'

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
      //console.log("err: ", err)
      localStorage.removeItem(LOCAL_STRAGE_KEY);
      this.props.history.push("/")
    })
  }

  onEditRecipe = (recipe) => {
    const edit = {
      isEditing : true,
      recipe : recipe
    }
    this.props.mapDispatchToSetRecipes(edit)
    this.props.history.push("recipe_form")
  }


  newRecipeRequest = () => {
    this.props.mapDispatchToSetRecipes({})
    this.props.history.push('recipe_form')
  }

  render() {

    const recipes = this.props.recipesState.recipes
    
    return(
      <Container textAlign='left'>

        <div style={{marginTop:60}}>
          <a style={{cursor: 'pointer'}} onClick={() => this.newRecipeRequest()}>New recipe</a>
          <div style={{float: 'right'}}>
            <a style={{cursor: 'pointer'}} onClick={() => this.logoutRequest()}>Logout</a>
          </div>
        </div>

        <div>
          {
            recipes.length > 0 &&
            recipes.map((value, key) => 
              (<Popup key={key} trigger={
                <Recipe data={value}/>
              } flowing hoverable>
                <Grid centered divided columns={2}>
                  <Grid.Column textAlign='center'>
                    <Button onClick={() => this.onEditRecipe(value)} color='blue'>Edit</Button>
                  </Grid.Column>
                  <Grid.Column textAlign='center'>
                    <Button color='blue'>Delete</Button>
                  </Grid.Column>
                </Grid>
              </Popup>)
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

function mapDispatchToProps (dispatch) {
  return {
    mapDispatchToSetRecipes: (data) => dispatch(setEditRecipeRedux({ params: data}))
  }
}

// export default withRouter(MainPage);
export default withRouter( connect( mapStateToProps, mapDispatchToProps )(Dashboard) )
