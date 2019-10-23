import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ArrowBack } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const HeaderTitle = ({ children, className, linkTo }) => {
  return (
    <Fragment>
      { linkTo && (
        <Link to={ linkTo } className='action-back ml-n1 mb-n1 pt-1'>
          <ArrowBack />
          Voltar
        </Link>
      )}
      <h2 className={ classNames('mt-0 mb-4', className) }>
        { children }
      </h2>
    </Fragment>
  )
}

HeaderTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  linkTo: PropTypes.string,
}

HeaderTitle.defaultProps = {
  className: '',
  linkTo: null,
}

export default HeaderTitle
