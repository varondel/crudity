import React, { Component } from 'react'
import { Menu,  Accordion, Form } from 'semantic-ui-react'


const SizeForm = (
  <Form>
    <Form.Group grouped>
      <Form.Radio label='Small' name='size' type='radio' value='small' />
      <Form.Radio label='Medium' name='size' type='radio' value='medium' />
      <Form.Radio label='Large' name='size' type='radio' value='large' />
      <Form.Radio label='X-Large' name='size' type='radio' value='x-large' />
    </Form.Group>
  </Form>
)

const ColorForm = (
  <Menu.Menu>
    <Menu.Item
      name='enterprise'
      onClick={this.handleItemClick}
    />
    <Menu.Item
      name='consumer'
      onClick={this.handleItemClick}
    />
  </Menu.Menu>
)

export default class MenuExampleHeaderVertical extends Component {
  handleItemClick = name => this.setState({ activeItem: name })

  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeItem } = this.state || {}
    const { activeIndex } = this.state

    return (

      <div className='sideMenuWrapper'>
        <Menu vertical borderless inverted className='sideMenu'>
          <Menu.Item>
            <Menu.Header>Products</Menu.Header>

            <Menu.Menu>
              <Menu.Item
                name='enterprise'
                active={activeItem === 'enterprise'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='consumer'
                active={activeItem === 'consumer'}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>

          <Accordion as={Menu} vertical inverted fluid>
            <Menu.Item>
              <Accordion.Title
                active={activeIndex === 0}
                content='Size'
                index={0}
                onClick={this.handleClick}
              />
              <Accordion.Content active={activeIndex === 0} content={SizeForm} />
            </Menu.Item>

            <Menu.Item>
              <Accordion.Title
                active={activeIndex === 1}
                content='Colors'
                index={1}
                onClick={this.handleClick}
              />
              <Accordion.Content active={activeIndex === 1} content={ColorForm} />
            </Menu.Item>
          </Accordion>
        </Menu>
      </div>
    )
  }
}
