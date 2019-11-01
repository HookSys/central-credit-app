import React, { useEffect } from 'react'
import SvgImage from 'components/Atoms/SvgImage'

const { AVAILABLE_IMAGES } = SvgImage

const AppLoader = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#f0f1f4'
  }, [])

  return (
    <div style={ {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
    } }>
      <div
        style={ { width: '100%', height: '100%' } }
        className='lds-ripple'
      >
        <div />
        <div />
      </div>
    </div>
  )
}

export default AppLoader