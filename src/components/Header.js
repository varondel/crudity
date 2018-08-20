import React, { Component } from 'react'
import { Menu, Icon, Input } from 'semantic-ui-react'
import { withRouter } from 'react-router'
// API
import * as MyAPI from './../utils/MyAPI'

class MenuHeader extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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

  render() {
    const { activeItem } = this.state

    return (
      <div className='headerMenu'>
      <Menu inverted >
        <Menu.Item header>Our Company</Menu.Item>
        <Menu.Item
          name='aboutUs'
          active={activeItem === 'aboutUs'}
          onClick={this.handleItemClick}
        />
        <Menu.Item position='right'>
          <Menu.Item>
            <Input width='250px' className='icon' icon='search' placeholder='Search...' />
          </Menu.Item>
          <Icon name='power' onClick={() => this.onLogout()}/>
        </Menu.Item> 
      </Menu>
      </div>
    )
  }
}

export default withRouter(MenuHeader)