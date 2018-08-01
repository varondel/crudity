import React, { Component } from 'react'
import ArrayToList from './../ArrayToList'


class Recipe extends Component {


  render() {

    console.log('Render recipe')
    return(
      <div>
        <h2>{this.props.data.recipe.name}</h2>
        <p>Ingredients : </p>
        <ArrayToList array={this.props.data.recipe.ingredients}/>
        <p>Steps : </p>
        <ArrayToList array={this.props.data.recipe.steps}/>
      </div>
    )
  }
}

export default Recipe