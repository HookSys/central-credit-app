import React, { forwardRef, useLayoutEffect, useState, useCallback, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

const dropdownRoot = document.getElementById('dropdown-root')

const Dropdown = forwardRef(({ children }, ref) => {
  const [dropdownElement, setDropdownElement] = useState()
  const [position, setPosition] = useState({ y: 0, x: 0 })
  const [isVisible, toggleDropdown] = useState(false)

  useLayoutEffect(() => {
    const element = document.createElement('div')
    dropdownRoot.appendChild(element)
    setDropdownElement(element)
  }, [])

  const hide = useCallback(() => {
    if (isVisible) {
      toggleDropdown(false)
    }
  }, [isVisible, toggleDropdown])

  const show = useCallback((hoverRect) => {
  	if (dropdownElement != null) {
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

      setTimeout(() => toggleDropdown(true))
    }
  }, [dropdownElement])

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }))

  if (!dropdownElement) {
    return null
  }

  const style = {
    left: ((position.x + window.scrollX) + 'px'),
    top: ((position.y + window.scrollY) + 'px'),
    display: isVisible ? 'block' : 'none',
  }

  return ReactDOM.createPortal(
      <div
        className={ classNames('dropdown', {
        }) }
        style={ style }
      >
        { children }
      </div>,
    dropdownElement
  )
})

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Dropdown