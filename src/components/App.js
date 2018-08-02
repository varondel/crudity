import React, { Component } from 'react';
import '../App.css';

import { Route, Switch } from 'react-router-dom'
import Dashboard from './dashboard//Dashboard'
import Login from './Login'
import Home from './Home'
import NoMatch from './NoMatch'
import CreateAccont from './CreateAccont'
import RecipeForm from './RecipeForm'

// alert
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

// redux
import { connect } from 'react-redux'

import { withRouter } from 'react-router';

class App extends Component {

  componentDidMount() {
    // Login check

    console.log('App Did Mount')
 
  }

  render() {

    return (
      <div className="App">

        <Switch>

          <Route exact path='/' render={() => (
            <Home />
          )} />

          <Route exact path='/notfound' component={NoMatch} />

          <Route exact path='/login' render={() => (
            <Login/>
          )} />}

          <Route exact path='/dashboard' render={() => (
            <Dashboard />
          )} />


          <Route exact path='/create_acount' render={() => (
            <CreateAccont />
          )} />

          <Route exact path='/recipe_form' render={() => (
            <RecipeForm />
          )} />


          <Route component={NoMatch} />

        </Switch>

        <Alert stack={{limit: 3}} />

      </div>
    );
  }
}

function mapStateToProps ({ user }) {
  return {
    user,
  }
}

// export default App;
export default withRouter(connect( mapStateToProps )(App))
//export default App
