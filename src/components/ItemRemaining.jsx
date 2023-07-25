import React from 'react'
import PropTypes, { func } from 'prop-types';


ItemRemaining.prototype = {
  remaining: PropTypes.func.isRequired
}

function ItemRemaining(props) {
  return (
    <span>{props.remaining()} items remaining</span>
  )
}

export default ItemRemaining
