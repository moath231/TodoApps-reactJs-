import React from 'react';

function Todocheckall(props) {
  return (
    <div onClick = {props.checkAll} className = "button">
      Check All
    </div>
  );
}

export default Todocheckall;
