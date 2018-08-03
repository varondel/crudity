import React, { Component } from 'react'
import ArrayToList from './../ArrayToList'
import {Segment} from 'semantic-ui-react'



class Recipe extends Component {

  
  render() {
    return(
      <Segment {...this.props} raised>
        <h1>{this.props.data.recipe.name}</h1>
        <h3>Ingredients : </h3>
        <ArrayToList array={this.props.data.recipe.ingredients}/>
        <h3>Steps : </h3>
        <ArrayToList array={this.props.data.recipe.steps}/>
      </Segment>
    )
  }
}

export default Recipe