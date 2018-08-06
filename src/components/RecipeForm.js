import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Container, Form, Input, Button, Grid } from 'semantic-ui-react'

import ArrayToList from './ArrayToList'
import * as MyAPI from '../utils/MyAPI'

import { setRecipesRedux } from '../actions/UserActions'

class RecipeForm extends Component {

  state = {
    name:'',
    currentIngredient:'',
    ingredients:[],
    currentStep:'',
    steps:[],
    duration : {
      hour:'',
      minute:''
    },
    difficulty:'',
    quantity:'',
    error:{
      name:'',
      duration:''
    }
  }

  constructor(props) {
    super(props)
    if (props.edit.isEditing === true) {
      const recipeForm = Object.assign({}, this.props.edit.recipeInfo.recipe)
      this.state = {
          ...this.state,
          ...recipeForm
        }
    }
  }

  isValid = () => {
    // Check Validation
    let isValid = true
    let durationError = ''
    let nameError = ''

    if (this.state.name === '') {
      isValid = false
      nameError = 'You need to name your recipe'
    } else
      nameError = ''

    if (!this.state.duration || ( this.state.duration.hour === '' && this.state.duration.minute === '')) {
      isValid = false
      durationError = 'How much time is required to prepare this recipe ?'
    } else
      durationError = ''

    this.setState((prevState) => ({
      error : {
        ...prevState.error,
        name : nameError,
        duration : durationError
      }
    }))
    
    return isValid
  }
   
  onSubmit = () => {
    if (this.isValid() === false)
      return

    const {name, ingredients, steps, duration, difficulty, quantity } = this.state
    let params = {
      userCredit : this.props.user,
      _id: this.props.edit.recipeInfo._id,
      name, 
      ingredients,
      steps,
      duration,
      difficulty,
      quantity
    }
    let action = ''

    if (this.props.edit.isEditing) {
// update recipe
      params = {...params, _id: this.props.edit.recipeInfo._id}
      action = 'update_recipe'
    } else {
// create recipe
      action = 'create_recipe'
    }

    MyAPI.fetchApi(params, action)
      .then((res) => {
        if (res.status === "success"){
          MyAPI.fetchRecipes()
          .then((result) => {
            this.props.history.push("dashboard")
          })
        }
        else {
          // Manage error page
        }
      })
  }

// Name callback
  onChangeName = (e, {value }) => {
    this.setState({name : value})
  }

// Duration callback
  onChangeDuration = (e, { name, value }) => {
    const re = /^[1-9\b][0-9\b]*$/;

    if ((value === '' || re.test(value)) && !(name === 'minute' && value >= 60)) {
      this.setState((prevState) => ({
        duration : {
          ...prevState.duration,
          [name] : value
        }
      }))
    }
  }

// Ingredients and steps callback
  onInputChange = (e, { name, value }) => {
    this.setState({[name]: value})
  }

  onAdd = (propertyState, propertyInput) => {
    if (this.state[propertyInput].length === 0)
      return

    this.setState((prevState) => ({
      [propertyState]: [...prevState[propertyState], this.state[propertyInput]],
      [propertyInput]: ''
    }))
  }

  onDelete = (key, stateName) => {
    const tempArray = [...this.state[stateName]]
    tempArray[key] = null
  
    const newArray = []
    let i = 0
  
    for (let j = 0; j < tempArray.length; j++) {
      if (tempArray[j] != null ) {
        newArray[i] = tempArray[j]
        i++
      }
    }
    this.setState({[stateName] : newArray})
  }

  switchIndex = (array, index_1, index_2) => {
    const temp = array[index_1]
    array[index_1] = array[index_2]
    array[index_2] = temp

    return array
  }

  onSwitch = (key, direction, stateProperty) => {
    let newArray = [...this.state[stateProperty]]

    switch(direction) {
      case 'up':
        if (key === 0)
          return
          newArray = this.switchIndex([...this.state[stateProperty]], key, key-1)
        break
      case 'down':
        if (key === this.state[stateProperty].length - 1)
          return
          newArray = this.switchIndex([...this.state[stateProperty]], key, key+1)
        break
      default:
        return
    }
    this.setState({[stateProperty]: newArray})
  }

  render() {
    
    return (
      <Container text>

        <Form className="ui form error" onSubmit={this.onSubmit} style={{marginTop:60}}>
          <Grid>

{/*Recipe Name*/}
            <Grid.Column textAlign='left' width={16}>
              <h3>Recipe name :</h3>
              <Input
                style={{width: '100%'}}
                icon={{className: 'utensils'}}
                iconPosition='left'
                name='name'
                onChange={this.onChangeName}
                value={this.state.name}
                placeholder='Name your recipe' 
              />
              {this.state.error.name !== '' &&
              <div className="ui error message">
                <div className="header">Invalid Name</div>
                <p>{this.state.error.name}</p>
              </div>} 
            </Grid.Column>

{/*Duration*/}
            <Grid.Column textAlign='left' width={16}>
              <h3>Duration : </h3>
              <div className="ui right labeled input" style={{width: "15%"}}>
                <Input
                  style={{width: '100%'}}
                  name='hour'
                  onChange={this.onChangeDuration}
                  value={this.state.duration ? this.state.duration.hour : ''}
                  placeholder='0' />
                <div className="ui basic label">
                  h
                </div>
              </div>
              <div className="ui right labeled input" style={{width: "15%"}}>
                <Input
                  style={{width: '100%'}}
                  name='minute'
                  onChange={this.onChangeDuration}
                  value={this.state.duration ? this.state.duration.minute : ''}
                  placeholder='0' />
                <div className="ui basic label">
                  mn
                </div>
              </div>
              {this.state.error.duration !== '' &&
              <div className="ui error message">
                <div className="header">Invalid Duration</div>
                <p>{this.state.error.duration}</p>
              </div>}
            </Grid.Column>

{/*Ingredients*/}
            <Grid.Column textAlign='left' width={16}>
              <h3>Ingredients : </h3>
              <ArrayToList
                onDelete = {(key) => {this.onDelete(key, 'ingredients')}}
                onSwitch = {(key, direction) => {this.onSwitch(key, direction, 'ingredients')}}
                array={this.state.ingredients}
                isEditing={this.props.edit.isEditing}/>
              <Input
                style={{width: '100%'}}
                icon={{className: 'plus link icon', onClick: () => {this.onAdd('ingredients', 'currentIngredient')}}}
                iconPosition='left'
                value={this.state.currentIngredient}
                name='currentIngredient'
                onChange={this.onInputChange}/>
            </Grid.Column>

{/*Steps*/}
            <Grid.Column textAlign='left' width={16}>
              <h3>Steps : </h3>
              <ArrayToList 
                onDelete = {(key) => {this.onDelete(key, 'steps')}}
                onSwitch = {(key, direction) => {this.onSwitch(key, direction, 'steps')}}
                array={this.state.steps}
                isEditing={this.props.edit.isEditing}
              />
              <Input
                style={{width: '100%'}}
                icon={{className: 'plus link icon', onClick: () => {this.onAdd('steps', 'currentStep')}}}
                iconPosition='left'
                value={this.state.currentStep}
                name='currentStep'
                onChange={this.onInputChange}/>
            </Grid.Column>

{/*Submit*/}
            <Grid.Column  width={16}>
              <Button
                style={{width: '100%'}}
                loading={this.state.loading}
                disabled={this.state.loading}
                type='submit'>Save
              </Button>
            </Grid.Column>

          </Grid>
        </Form>

      </Container>
    );
  }
}

// react-redux
function mapStateToProps ( {user, edit} ) {
  return {
    user,
    edit
  }
}

function mapDispatchToProps (dispatch) {
  return {
    mapDispatchToSetRecipes: (data) => dispatch(setRecipesRedux({ params: data}))
  }
}
  
  //export default CreateRecipeForm;
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeForm))
  