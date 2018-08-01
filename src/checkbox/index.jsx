import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { addClsPrefix } from '../utils/helpers'
import '../../style/components/checkbox.less'

export default class Checkbox extends React.PureComponent {
  static propTypes = {
    defaultValue: PropTypes.bool,
    onChange: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    classPrefix: PropTypes.string
  }

  static defaultProps = {
    classPrefix: 'cha',
    onChange: () => {}
  }

  constructor (props) {
    super(props)

    const {
      defaultValue = false,
      type = 'square',
      disabled = false
    } = props
    this.state = {
      checked: defaultValue,
      type,
      disabled
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      disabled: !!nextProps.disabled
    })
  }

  _handleChange = (e) => {
    const { checked, disabled } = this.state
    if (!disabled) {
      this.props.onChange(!checked, e)
      this.setState({
        checked: !checked
      })
    }
  }

  render () {
    const { checked, type, disabled } = this.state
    const { className, classPrefix, defaultValue } = this.props
    const cls = addClsPrefix('checkbox', classPrefix)
    const containerClassName = classnames([addClsPrefix('container', cls), {
      [addClsPrefix('container-checked', cls)]: checked,
      [addClsPrefix('container-circle', cls)]: type === 'circle',
      [addClsPrefix('container-disabled', cls)]: disabled
    }])

    const checkClassName = classnames([addClsPrefix('box', cls), {
      [addClsPrefix('box-checked', cls)]: checked,
      [addClsPrefix('box-disabled', cls)]: disabled
    }])

    return (
      <div className={classnames([classPrefix, className])}>
        <input onChange={this._handleChange} className={`${classPrefix}-input`} disabled={disabled} type='checkbox' defaultChecked={defaultValue} />
        <div className={containerClassName}>
          <div className={checkClassName} />
        </div>
      </div>
    )
  }
}
