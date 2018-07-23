import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './style/index.less'

export default class ActivityIndicator extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string
  }

  render () {
    return (
      <div className={classnames(['cha-activity-indicator', this.props.className])}>
        <div className="cha-indicator" />
      </div>
    )
  }
}
