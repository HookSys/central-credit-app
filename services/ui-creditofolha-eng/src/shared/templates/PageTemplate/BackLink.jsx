import React from 'react'
import PropTypes from 'prop-types'
import { ArrowBack } from '@material-ui/icons'
import Button from 'components/Button'

const BackLink = ({ children, onClick }) => {
  return (
    <Button
      onClick={ onClick }
      className='btn btn-link back-button'
    >
      <ArrowBack className='font-size-sm' />
      <span className='ml-1'>
        { children }
      </span>
    </Button>
  )
}

BackLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default BackLink
