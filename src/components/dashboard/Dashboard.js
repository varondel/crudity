import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

// API
import * as MyAPI from '../../utils/MyAPI'
//Recipe
import Recipe from './Recipe'
//Redux
import { setEditRecipeRedux } from '../../actions/UserActions'
import { setRecipesRedux } from '../../actions/UserActions'
import { logoutRedux } from '../../actions/UserActions'

class Dashboard extends Component {

  componentDidMount(){
    this.props.mapDispatchToEditRecipes({isEditing : false, recipeInfo : {}})
  }

  onLogout = () => {
    MyAPI.logout()
    .then(() => {
      this.props.history.push("/")
    })
    .catch((err) => {
      console.log("err: ", err)
      this.props.history.push("/")
    })
  }

  onCreateRecipe = () => {
    this.props.mapDispatchToEditRecipes({isEditing: true, isUpdating: false, recipeInfo : {}})
    this.props.history.push('recipe_form')
  }

  render() {

    const recipes = this.props.recipesState
    
    return(
      <div className='main'>
        <Container>
          <div style={{marginTop:60}}>
            <a style={{cursor: 'pointer'}} onClick={() => this.onCreateRecipe()}>New recipe</a>
            <div style={{float: 'right'}}>
              <a style={{cursor: 'pointer'}} onClick={() => this.onLogout()}>Logout</a>
            </div>
          </div>

          <div>
            {
              recipes.length > 0 &&
              recipes.map((value, key) => 
                ( <Recipe key={key} id={key} data={value}/> )
              )
            }
          </div>
        </Container>
      </div>
    )
  }
}

// react-redux
function mapStateToProps ( {recipes} ) {
  return {
    recipesState : recipes
  }
}

function mapDispatchToProps (dispatch) {
  return {
    mapDispatchToEditRecipes: (data) => dispatch(setEditRecipeRedux({ params: data})),
    mapDispatchToSetRecipes: (data) => dispatch(setRecipesRedux({ params: data})),
    mapDispatchToLogout: () => dispatch(logoutRedux({ params: {}}))
  }
}

// export default withRouter(MainPage);
export default withRouter( connect( mapStateToProps, mapDispatchToProps )(Dashboard) )
