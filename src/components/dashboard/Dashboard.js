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
import { setRecipesRedux } from '../../actions/UserActions'

class Dashboard extends Component {

  componentDidMount(){
    this.props.mapDispatchToEditRecipes({isEditing : false, recipeInfo : {}})
  }

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
      recipeInfo : recipe
    }
    this.props.mapDispatchToEditRecipes(edit)
    this.props.history.push("recipe_form")
  }

  fetchRecipe = () => {
    const { user } = this.props
      
    const param = {
      userId: user.user._id
    }

    MyAPI.fetchRecipes(param)
    .then((result) => {

      this.props.mapDispatchToSetRecipes(result.recipes)
    })
  }

  onDeleteRecipe = (key) => {

    const params = {
      userCredit : this.props.user,
      _id: this.props.recipesState[key]._id,
    }
    console.log(params)

    MyAPI.deleteRecipe(params)
    .then((res) => {
      if (res.status === "success"){
        this.fetchRecipe()
      }
      else {
        // Manage error page
      }
    })
    .catch((err) => {
      console.log("err:", err)
      localStorage.removeItem(LOCAL_STRAGE_KEY);
    })

    // TODO : remove from db and fetch
    //this.props.mapDispatchToSetRecipes(newRecipes)
  }


  newRecipeRequest = () => {
    this.props.mapDispatchToEditRecipes({isEditing : false, recipeInfo : {}})
    this.props.history.push('recipe_form')
  }

  render() {

    const recipes = this.props.recipesState
    
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
                <Recipe key={key} data={value}/>
              } flowing hoverable>
                <Grid centered divided columns={2}>
                  <Grid.Column textAlign='center'>
                    <Button onClick={() => this.onEditRecipe(value)} color='blue'>Edit</Button>
                  </Grid.Column>
                  <Grid.Column textAlign='center'>
                    <Button onClick={() => this.onDeleteRecipe(key)} color='blue'>Delete</Button>
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
    mapDispatchToEditRecipes: (data) => dispatch(setEditRecipeRedux({ params: data})),
    mapDispatchToSetRecipes: (data) => dispatch(setRecipesRedux({ params: data}))
  }
}

// export default withRouter(MainPage);
export default withRouter( connect( mapStateToProps, mapDispatchToProps )(Dashboard) )
