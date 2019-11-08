import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import GridLayout from 'components/GridLayout'

const Card = ({ children, className, size }) => {
  const cardTemplate = `
    'title actions'
    'infos infos'
    / 1fr 1fr
  `

  return (
    <div className={ size }>
      <GridLayout
        gridTemplate={ cardTemplate }
        className={ classNames('card', className) }
      >
        { children }
      </GridLayout>
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
}

Card.defaultProps = {
  className: '',
  size: 'col-12 col-sm-6 col-xl-4',
}

export default Card
