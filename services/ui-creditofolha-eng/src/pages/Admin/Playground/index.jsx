import React, { Component } from 'react'

class Playground extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-5'>
          1
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default Playground
