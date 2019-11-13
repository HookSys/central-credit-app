import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Playground extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-5'>
          2
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default withRouter(Playground)
