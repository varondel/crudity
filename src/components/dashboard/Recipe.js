import React, { Component } from 'react'
import ArrayToList from './../ArrayToList'
import {Segment} from 'semantic-ui-react'



class Recipe extends Component {

  
  render() {
    return(
      <Segment {...this.props} raised>
        <h2>{this.props.data.recipe.name}</h2>
        <p>Ingredients : </p>
        <ArrayToList array={this.props.data.recipe.ingredients}/>
        <p>Steps : </p>
        <ArrayToList array={this.props.data.recipe.steps}/>
      </Segment>
    )
  }
}

export default Recipe