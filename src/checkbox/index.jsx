import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import '../../style/components/checkbox.less'

export default class Checkbox extends React.PureComponent {
  static propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string
  };

  constructor (props) {
    super(props)

    const {
      checked = false,
      type = 'square',
      disabled = false
    } = props
    this.state = {
      checked,
      type,
      disabled
    }
  }

  componentWillReceiveProps (nextProps) {
    const keys = ['checked', 'type', 'disabled']
    const state = {}
    keys.map(key => {
      if (nextProps[key]) {
        state[key] = nextProps[key]
      }
    })
    this.setState(state)
  }

  _handleChange = (e) => {
    const { checked, disabled } = this.state
    if (!disabled) {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(!checked, e)
      }
      this.setState({
        checked: !checked
      })
    }
  }

  render () {
    const { checked, type, disabled } = this.state
    const { className } = this.props
    const classPrefix = 'checkbox'
    const containerClassName = classnames([`${classPrefix}-container`, {
      [`${classPrefix}-container-checked`]: checked,
      [`${classPrefix}-container-circle`]: type === 'circle',
      [`${classPrefix}-container-disabled`]: disabled
    }])

    const checkClassName = classnames([`${classPrefix}-box`, {
      [`${classPrefix}-box-checked`]: checked,
      [`${classPrefix}-box-disabled`]: disabled
    }])

    return (
      <label className={classnames([classPrefix, className])}>
        <input onChange={this._handleChange} className={`${classPrefix}-input`} disabled={disabled} type='checkbox' checked={checked} />
        <div className={containerClassName}>
          <div className={checkClassName} />
        </div>
      </label>
    )
  }
}
