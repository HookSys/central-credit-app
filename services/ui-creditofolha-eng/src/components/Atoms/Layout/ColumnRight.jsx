import React, { createContext, useContext, memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export const MobileActionBarContext = createContext()

const ColumnRight = React.forwardRef(
  ({ children, className, isMobileActionBar }, ref) => {
    const { mobileActionBarVisible, setMobileActionBarVisible } = useContext(MobileActionBarContext)

    useEffect(() => {
      if (isMobileActionBar && !mobileActionBarVisible) {
        setMobileActionBarVisible(isMobileActionBar)
      }

      return () => {
        if (isMobileActionBar && mobileActionBarVisible) {
          setMobileActionBarVisible(false)
        }
      }
    }, [])

    return (
      <div
        ref={ ref }
        className={ classNames('ml-auto', {
          'mobile-action-bar': isMobileActionBar,
        }, className) }
      >
        { children }
      </div>
    )
  }
)

ColumnRight.propTypes = {
  children: PropTypes.node.isRequired,
  isMobileActionBar: PropTypes.bool,
  className: PropTypes.string,
}

ColumnRight.defaultProps = {
  className: '',
  isMobileActionBar: false,
}

export default memo(ColumnRight)
