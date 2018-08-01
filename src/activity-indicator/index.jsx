import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { addClsPrefix } from '../utils/helpers'
import '../../style/components/activity-indicator.less'

export default class ActivityIndicator extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string
  }

  static defaultProps = {
    classPrefix: 'cha'
  }

  render () {
    const { className, classPrefix } = this.props
    return (
      <div className={classnames([addClsPrefix('activity-indicator', classPrefix), className])}>
        <div className={addClsPrefix('indicator', classPrefix)} />
      </div>
    )
  }
}
