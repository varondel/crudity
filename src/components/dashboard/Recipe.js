import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import ArrayToList from './../ArrayToList'
import {Segment} from 'semantic-ui-react'

// API
import * as MyAPI from '../../utils/MyAPI'

import { setEditRecipeRedux } from '../../actions/UserActions'


class Recipe extends Component {


  onEditRecipe = (recipe) => {
    const edit = {
      isUpdating: true,
      isEditing: true,
      recipeInfo: recipe
    }
    this.props.mapDispatchToEditRecipes(edit)
    this.props.history.push("recipe_form")
  }

  onDeleteRecipe = (key) => {
    console.log(this.props.key)
    console.log(this.props.recipesState)
    const params = {
      userCredit : this.props.user,
      _id: this.props.recipesState[key]._id,
    }

    MyAPI.fetchApi(params, 'delete_recipe')
    .then((res) => {
      if (res.status === "success"){
        MyAPI.fetchRecipes()
      }
      else {
        // Manage error page
      }
    })
    .catch((err) => {
      console.log("err:", err)
    })
  }
  
  render() {
    return(
      <Segment raised>
        <h1>{this.props.data.recipe.name}</h1>
        <h3>Ingredients : </h3>
        <ArrayToList array={this.props.data.recipe.ingredients}/>
        <h3>Steps : </h3>
        <ArrayToList array={this.props.data.recipe.steps}/>
        <div style={{position:'absolute', right:'10px', bottom:'3px'}}>
          <a style={{cursor: 'pointer'}} onClick={() => this.onEditRecipe(this.props.data)} color='blue'>Edit</a>
          <span color='blue'> | </span>
          <a style={{cursor: 'pointer'}} onClick={() => this.onDeleteRecipe(this.props.id)} color='blue'>Delete</a>
        </div>
      </Segment>
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(Recipe))