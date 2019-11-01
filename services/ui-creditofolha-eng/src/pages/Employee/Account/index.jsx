import React, { Component } from 'react'
import { Dropdown, Button } from 'components'

class Account extends Component {
  dropdownRef = React.createRef()
  state = {
    visible: false,
  }

  // handleOnMouseOut = (evt) => {
  // 	this.dropdownRef.current.hide();
  // }
  // handleOnMouseOver = (evt) => {
  // 	let el = evt.currentTarget;
  //   if(el != null) {
  //   	const rect = el.getBoundingClientRect();
  //     this.dropdownRef.current.show(rect);
	// 	}
  // }

  onButtonClick = ({ currentTarget }) => {
    const { visible } = this.state
    if (!visible) {
      this.dropdownRef.current.show(currentTarget.getBoundingClientRect());
      this.setState({
        visible: true,
      })
    } else {
      this.dropdownRef.current.hide();
      this.setState({
        visible: false,
      })
    }
  }

  render() {
    return (
      <div className='row'>
        <div className='col-5'>
          <div>
            <button
              type='button'
              onClick={ this.onButtonClick }
            >
              Test
            </button>
            <Dropdown ref={ this.dropdownRef } />
          </div>
        </div>
      </div>
    )
  }
}

export default Account
