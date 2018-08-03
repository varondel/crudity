import React, { Component } from 'react'
import { Icon, Button, List } from 'semantic-ui-react'
import { connect } from 'react-redux'


// Render ingredients list
class ArrayToList extends Component {

  render() {
    return(
      <List verticalAlign='middle'>
        {
          this.props.array.map((value, key) => 
            <List.Item key={key}>
              {this.props.isEditing &&
                <List.Content floated='right'>
                  <Button 
                    type = 'button'
                    onClick = {() => {this.props.onDelete(key)}} 
                    icon>
                    <Icon name='trash' />
                  </Button>
                </List.Content>
              }
              <Icon name='right triangle' color='grey' />
              <List.Content>{value}</List.Content>
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
