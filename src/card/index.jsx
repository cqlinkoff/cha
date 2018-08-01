import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { addClsPrefix } from '../utils/helpers'

import '../../style/components/card.less'

export default class Card extends React.PureComponent {
  static propTypes = {
    className: PropTypes.any,
    children: PropTypes.any,
    classPrefix: PropTypes.string
  }

  static defaultProps = {
    classPrefix: 'cha'
  }

  render () {
    const { className, children, classPrefix, ...props } = this.props
    return (
      <div tabIndex='-1' className={classnames([addClsPrefix('card', classPrefix), className])} {...props}>{children}</div>
    )
  }
}
