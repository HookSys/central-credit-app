import React, {
  forwardRef,
  useLayoutEffect,
  useState,
  useCallback,
  useImperativeHandle,
  Fragment,
  useEffect,
  useRef,
} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import Action from './Action'
import Header from './Header'

const dropdownRoot = document.getElementById('dropdown-root')

const Dropdown = forwardRef(({ children, className }, ref) => {
  const [position, setPosition] = useState({ y: 0, x: 0 })
  const [isVisible, toggleDropdown] = useState(false)
  const [parent, setParent] = useState(null)
  const dropdownRef = useRef()

  useEffect(() => {
    if (parent) {
      const hoverRect = parent.getBoundingClientRect()
      const { current: dropdownElement } = dropdownRef

      if (hoverRect !== null && dropdownElement !== null) {
        let x = 0
        let y = 0

        const docWidth = document.documentElement.clientWidth
        const docHeight = document.documentElement.clientHeight
        
        const rx = hoverRect.x + hoverRect.width
        const lx = hoverRect.x
        const ty = hoverRect.y
        const by = hoverRect.y + hoverRect.height
        
        const ttRect = dropdownElement.getBoundingClientRect()
        
        const bAbove = (ty - ttRect.height) >= 0
        const bBellow = (by + ttRect.height) <= (window.scrollY + docHeight)
        
        if (bBellow) {
          y = by
          x = lx + (hoverRect.width - ttRect.width)
          
          if (x < 0) {
            x = lx
          }
        } else if (bAbove) {
          y = ty - ttRect.height
          x = lx + (hoverRect.width - ttRect.width)
          
          if (x < 0) {
            x = lx
          }
        }
        
        setPosition({
          x: x,
          y: y,
        })
      }
    }
  }, [parent])

  const hide = useCallback(() => {
    if (isVisible) {
      toggleDropdown(false)
    }
  }, [isVisible, toggleDropdown])

  const show = useCallback((element) => {
    if (isVisible) {
      setParent(null)
      toggleDropdown(false)
    } else {
      setParent(element.currentTarget)
      setTimeout(() => toggleDropdown(true))
    }
  }, [setParent, isVisible, toggleDropdown])

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }))

  const style = {
    left: ((position.x + window.scrollX) + 'px'),
    top: ((position.y + window.scrollY) + 'px'),
    visibility: isVisible ? 'visible' : 'hidden',
  }

  const dropdown = (
    <Fragment>
      <div
        className={ classNames('dropdown', className) }
        style={ style }
        ref={ dropdownRef }
      >
        { children }
      </div>
      { isVisible && (<div className='dropdown-overlay' onClick={ () => hide() } />) }
    </Fragment>
  )

  return ReactDOM.createPortal(dropdown, dropdownRoot)
})

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Dropdown.defaultProps = {
  className: '',
}

Dropdown.Action = Action
Dropdown.Header = Header

export default Dropdown