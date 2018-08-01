import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Container, Form, Input, Button, Grid } from 'semantic-ui-react'

import ArrayToList from './ArrayToList'
import * as MyAPI from '../utils/MyAPI'

import { setRecipesRedux } from '../actions/UserActions'

class CreateRecipeForm extends Component {

  state = {
    recipeName:'',
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
      recipeName:'',
      duration:''
    }
  }
   
  onSubmit = () => {

    const {recipeName, ingredients, steps, duration, difficulty, quantity } = this.state

    const params = {
      userCredit : this.props.user,
      recipeName, 
      ingredients,
      steps,
      duration,
      difficulty,
      quantity
    }

    // Check Validation
    let isValid = true
    let durationError = ''
    let nameError = ''

    if (this.state.recipeName === '') {
      isValid = false
      nameError = 'You need to name your recipe'
    } else
      nameError = ''

    if (this.state.duration.hour === '' && this.state.duration.minute === '') {
      isValid = false
      durationError = 'How much time is required to prepare this recipe ?'
    } else
      durationError = ''

    this.setState((prevState) => ({
      error : {
        ...prevState.error,
        recipeName : nameError,
        duration : durationError
      }
    }))

    if (isValid === false)
      return

    // create account
    MyAPI.createRecipe(params)
    .then((res) => {
      if (res.status === "success"){
        
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
      else {
        // Manage error page
      }
    })
  }

  onChangeName = (e, { name, value }) => {
    this.setState({recipeName : value})
  }

  onChangeDuration = (e, { name, value }) => {
    const re = /^[1-9\b][0-9\b]*$/;

    if ((value === '' || re.test(value)) && !(name === 'minute' && value > 60)) {
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
    this.setState((prevState) => ({
      ingredients: [...prevState.ingredients, this.state.currentIngredient]
    }))
  }


// Steps callbacks
onStepChange = (e, { name, value }) => {
  this.setState({currentStep: value})
}

onAddStep = () => {
  this.setState((prevState) => ({
    steps: [...prevState.steps, this.state.currentStep]
  }))
}

  render() {
    
    return (
      <Container text>

        <Form className="ui form error" onSubmit={this.onSubmit} style={{marginTop:60}}>
          <Grid>

{/*Recipe Name*/}
            <Grid.Column textAlign='left' width={16}>
              <p>Recipe name :</p>
              <Input
                style={{width: '100%'}}
                icon={{className: 'utensils'}}
                iconPosition='left'
                name='recipeName'
                onChange={this.onChangeName}
                value={this.state.name}
                placeholder='Name your recipe' 
              />
              {this.state.error.recipeName !== '' &&
              <div className="ui error message">
                <div className="header">Invalid Name</div>
                <p>{this.state.error.recipeName}</p>
              </div>} 
            </Grid.Column>

{/*Duration*/}
            <Grid.Column textAlign='left' width={16}>
              <p>Duration : </p>
              <div className="ui right labeled input" style={{width: "15%"}}>
                <Input
                  style={{width: '100%'}}
                  name='hour'
                  onChange={this.onChangeDuration}
                  value={this.state.duration.hour}
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
                  value={this.state.duration.minute}
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
              <p>Ingredients : </p>
              <ArrayToList array={this.state.ingredients}/>
              <Input
                style={{width: '100%'}}
                icon={{className: 'plus link icon', onClick: this.onAddIngredient}}
                iconPosition='left'
                onChange={this.onIngredientChange}/>
            </Grid.Column>

{/*Steps*/}
            <Grid.Column textAlign='left' width={16}>
              <p>Steps : </p>
              <ArrayToList array={this.state.steps}/>
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
function mapStateToProps ( {user} ) {
  return {
    user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    mapDispatchToSetRecipes: (data) => dispatch(setRecipesRedux({ params: data}))
  }
}
  
  //export default CreateRecipeForm;
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateRecipeForm))
  