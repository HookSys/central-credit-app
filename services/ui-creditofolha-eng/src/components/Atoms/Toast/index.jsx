import React, { PureComponent, createContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'

export const ToastContext = createContext()

class Toast extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  showSuccessToast = (toastObject) => {
    toast(toastObject.message, {
      type: toast.TYPE.SUCCESS,
      closeButton: false,
      hideProgressBar: true,
      autoClose: 3000,
      draggable: false,
    })
  }

  showErrorToast = (toastObject) => {
    toast(toastObject.message, {
      type: toast.TYPE.ERROR,
      closeButton: false,
      hideProgressBar: true,
      autoClose: 3000,
      draggable: false,
    })
  }

  render() {
    const { children } = this.props

    return (
      <Fragment>
        <ToastContainer position={ toast.POSITION.TOP_CENTER } />
        <ToastContext.Provider
          value={ {
            showSuccessToast: this.showSuccessToast,
            showErrorToast: this.showErrorToast,
          } }
        >
          { children }
        </ToastContext.Provider>
      </Fragment>
    )
  }
}

export default Toast
