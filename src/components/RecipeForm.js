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

  fetchRecipe = () => {
    const { user } = this.props
      
    const param = {
      userId: user.user._id
    }

    MyAPI.fetchRecipes(param)
    .then((result) => {

      this.props.mapDispatchToSetRecipes(result)
    })
    .then((result) => {
      this.props.history.push("dashboard")
    })
  }
   
  onSubmit = () => {
    if (this.isValid() === false)
      return

    if (this.props.edit.isEditing) {
      // update recipe
      const {name, ingredients, steps, duration, difficulty, quantity } = this.state

      const params = {
        userCredit : this.props.user,
        _id: this.props.edit.recipeInfo._id,
        name, 
        ingredients,
        steps,
        duration,
        difficulty,
        quantity
      }

      MyAPI.updateRecipe(params)
      .then((res) => {
        if (res.status === "success"){
          this.fetchRecipe()
        }
        else {
          // Manage error page
        }
      })
    } else {
       // create recipe
       const {name, ingredients, steps, duration, difficulty, quantity } = this.state

       const params = {
         userCredit : this.props.user,
         name, 
         ingredients,
         steps,
         duration,
         difficulty,
         quantity
       }

      MyAPI.createRecipe(params)
      .then((res) => {
        if (res.status === "success"){
          this.fetchRecipe()
        }
        else {
          // Manage error page
        }
      })
    }
  }

  onChangeName = (e, {value }) => {
    this.setState({name : value})
  }

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

// Ingredients callbacks
  onIngredientChange = (e, { name, value }) => {
    this.setState({currentIngredient: value})
  }

  onAddIngredient = () => {
    if (this.state.currentIngredient.length === 0)
      return

    this.setState((prevState) => ({
      ingredients: [...prevState.ingredients, this.state.currentIngredient]
    }))
  }

  onDeleteIngredient = (key) => {
    const ingredientsTemp = [...this.state.ingredients]
    ingredientsTemp[key] = null
  
    const newIngredients = []
    let i = 0
  
    for (let j = 0; j < ingredientsTemp.length; j++) {
      if (ingredientsTemp[j] != null ) {
        newIngredients[i] = ingredientsTemp[j]
        i++
      }
    }

    this.setState({ingredients : newIngredients})
  }

// Steps callbacks
onStepChange = (e, { name, value }) => {
  this.setState({currentStep: value})
}

onAddStep = () => {
  if (this.state.currentStep.length === 0)
    return

  this.setState((prevState) => ({
    steps: [...prevState.steps, this.state.currentStep]
  }))
}

onDeleteStep = (key) => {
  const stepsTemp = [...this.state.steps]
  stepsTemp[key] = null

  const newSteps = []
  let i = 0

  for (let j = 0; j < stepsTemp.length; j++) {
    if (stepsTemp[j] != null ) {
      newSteps[i] = stepsTemp[j]
      i++
    }
  }

  this.setState({steps : newSteps})
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
                onDelete = {(key) => {this.onDeleteIngredient(key)}}
                array={this.state.ingredients}
                isEditing={this.props.edit.isEditing}/>
              <Input
                style={{width: '100%'}}
                icon={{className: 'plus link icon', onClick: this.onAddIngredient}}
                iconPosition='left'
                onChange={this.onIngredientChange}/>
            </Grid.Column>

{/*Steps*/}
            <Grid.Column textAlign='left' width={16}>
              <h3>Steps : </h3>
              <ArrayToList 
                onDelete = {(key) => {this.onDeleteStep(key)}}
                array={this.state.steps}
                isEditing={this.props.edit.isEditing}
              />
              <Input
                style={{width: '100%'}}
                icon={{className: 'plus link icon', onClick: this.onAddStep}}
                iconPosition='left'
                onChange={this.onStepChange}/>
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
  