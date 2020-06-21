import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Container = ({ children, className, isWhiteBackground, autofocus, size }) => {
  const containerRef = useRef()

  useEffect(() => {
    if (autofocus) {
      setTimeout(() => {
        const { current: container } = containerRef
        const input = container.querySelector('input, select')
        if (input) {
          input.focus()
        }
      })
    }
  }, [autofocus])

  return (
    <div className='row' ref={containerRef}>
      <div className={classNames('border border-gray', className, {
        'col-sm-12': !size,
        [`col-sm-${size}`]: size,
        'bg-container': !isWhiteBackground,
        'bg-white': isWhiteBackground
      })}
      >
        { children }
      </div>
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
  isWhiteBackground: PropTypes.bool,
  autofocus: PropTypes.bool
}

Container.defaultProps = {
  className: 'p-4',
  size: null,
  isWhiteBackground: false,
  autofocus: false
}

export default React.memo(Container)
