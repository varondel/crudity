import React from 'react';


// Render ingredients list
const ArrayToList = (props) => {
  return(
    <ul>
      {
        props.array.map((value, key) => 
          <li key={key}> {value} </li>
        )
      }
    </ul>
  )
}

export default ArrayToList;
