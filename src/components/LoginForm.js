import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

// semantic-ui
import { Container, Form, Input, Button, Grid } from 'semantic-ui-react'

// alert
import Alert from 'react-s-alert';

// API
import * as MyAPI from '../utils/MyAPI'

import { loginWithEmailRedux } from '../actions/UserActions'
import { setRecipesRedux } from '../actions/UserActions'

class LoginForm extends Component {

  state = {
    email: '',
    password: '',
  }

  onSubmit = () => {

    const { email, password } = this.state
    const params = {
      email: email,
      password: password,
    }

    // create account
    MyAPI.fetchApi(params, 'login_with_email_password')
    .then((data) => {

      return new Promise((resolve, reject) => {

        if (data.status !== 'success'){
          let error_text = 'Error';
          if (data.detail){
            error_text = data.detail
          }
          reject(error_text)

        } else {
          // success
          const params = {
            user: data.user,
            login_token: data.login_token,
          }

          this.props.mapDispatchToLoginWithPassword(params)

          resolve()
        }
      })
    })
    .then(() => {
      MyAPI.fetchRecipes()
      .then((result) => {
        this.props.history.push("dashboard")
      })
    })
    .catch((err) => {
      console.log("err:", err)

      Alert.error(err, {
        position: 'top-right',
        effect: 'slide',
        timeout: 5000
      });
    })
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render() {

    const { email, password } = this.state

    return(
      <Container text className='create_acount_form'>

        <Form onSubmit={this.onSubmit} style={{marginTop:60}}>
          <Grid>
            <Grid.Column textAlign='left' width={16}>
              <label>Email</label>
              <Input
                style={{width: '100%'}}
                icon='mail outline'
                iconPosition='left'
                name='email'
                onChange={this.handleChange}
                value={email}
                placeholder='yourname@example.com' />
            </Grid.Column>

            <Grid.Column textAlign='left' width={16}>
              <label>Password</label>
              <Input
                type='password'
                style={{width: '100%'}}
                icon='key'
                iconPosition='left'
                name='password'
                onChange={this.handleChange}
                value={password}
                placeholder='********' />
            </Grid.Column>

            <Grid.Column  width={16}>
              <Button
                style={{width: '100%'}}
                loading={this.state.loading}
                disabled={this.state.loading}
                type='submit'>Sign in</Button>
            </Grid.Column>
          </Grid>
        </Form>
      </Container>
    )
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
    mapDispatchToLoginWithPassword: (data) => dispatch(loginWithEmailRedux({ params: data})),
    mapDispatchToSetRecipes: (data) => dispatch(setRecipesRedux({ params: data}))
  }
}

// export default withRouter(MainPage);
export default withRouter( connect( mapStateToProps, mapDispatchToProps )(LoginForm) )
