import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Bar, defaults } from 'react-chartjs-2'
import { ReceiptOutlined } from '@material-ui/icons'

defaults.scale.ticks.beginAtZero = true

const Chart = ({ className, title, data, children }) => {
  return (
    <div className={classNames('chart shadow-sm', className)}>
      { title && (<span className='chart-title'><ReceiptOutlined className='mr-auto' /> <span className='mr-auto'>{ title }</span></span>)}
      <Bar
        data={data}
      />
      { children }
    </div>
  )
}

Chart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

Chart.defaultProps = {
  className: '',
  title: null
}

export default Chart
