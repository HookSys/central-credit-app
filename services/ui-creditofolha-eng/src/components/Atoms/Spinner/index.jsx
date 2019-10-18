import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'

export default class Spinner extends Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto'
  }

  render() {
    return (
      <div className='app-loading'>
        <div className='app-loading-overlay ' />
        <LinearProgress className='app-loading-line' />
        <CircularProgress color='inherit' className='app-loading-circular' size='50' />
      </div>
    )
  }
}
