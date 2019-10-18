import React, { Component } from 'react'
// import PropTypes from 'prop-types'

class Login extends Component {
  static propTypes = {
  }

  componentDidMount() {
    document.body.style.backgroundColor = '#828595'
  }

  onSubmit = () => {
  }

  render() {
    return (
      <div className='container login'>
        <div className='row h-100 justify-content-md-center align-items-md-center'>
          <div className='col-12 col-md-4 p-5 form-container'>
            <div className='d-flex justify-content-center align-items-center w-100'>
              Test
            </div>
            <p>Seja bem vindo! Acesse sua conta caso possua cadastro.</p>
            <button className='btn btn-primary col-12' type='submit'>LOGIN</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
