import React, { Component } from 'react'
import { Icon, Button, List } from 'semantic-ui-react'
import { connect } from 'react-redux'


// Render ingredients list
class ArrayToList extends Component {

  render() {
    return(
      <List divided={this.props.isEditing} verticalAlign='middle'>
        {
          this.props.array.map((value, key) => 
            <List.Item key={key} className={this.props.isEditing ? 'itemListHover' : ''} style={{display: 'flex', alignItems: 'center'}}>
              <Icon name='right triangle' color='grey' />
              <List.Content style={{flex:'1'}}>{value}</List.Content>
              {this.props.isEditing &&
              <span>
                 <List.Content floated='right'>
                  <Button 
                    style={{marginTop:'10px'}}
                    type = 'button'
                    onClick = {() => {this.props.onDelete(key)}} 
                    icon>
                      <Icon name='trash' />
                  </Button>
                </List.Content>
                <List.Content floated='right'>
                  <Button.Group icon vertical size='mini'>
                    <Button
                      type = 'button'
                      onClick = {() => {this.props.onSwitch(key, 'up')}}
                      icon>
                        <Icon name='angle up'/>
                    </Button>
                    <Button
                      type = 'button'
                      onClick = {() => {this.props.onSwitch(key, 'down')}}
                      icon='angle down'>
                    </Button>
                  </Button.Group>
                </List.Content>
              </span>
              }
            </List.Item>
          )
        }
      </List>
    )
  } 
}

// react-redux
function mapStateToProps ( {edit} ) {
  return {
    isEditing : edit.isEditing
  }
}

// export default withRouter(MainPage);
export default connect( mapStateToProps )(ArrayToList)
