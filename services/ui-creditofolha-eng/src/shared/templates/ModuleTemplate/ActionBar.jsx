import React, { useState } from 'react'
import PropTypes from 'prop-types'

const ActionBarContext = React.createContext({
  isActionBarVisible: false,
  toggleActionBar: () => {},
})

const ActionBarProvider = ({ children }) => {
  const [isActionBarVisible, toggleActionBar] = useState(false)

  return (
    <ActionBarContext.Provider
      value={ {
        isActionBarVisible,
        toggleActionBar,
      } }
    >
      { children }
    </ActionBarContext.Provider>
  )
}

ActionBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

const ActionBar = () => {
  return (
    <div id='action-bar-render' />
  )
}

export {
  ActionBarProvider,
  ActionBarContext,
}
export default ActionBar
