import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ActivityIndicator from '../activity-indicator'
import { addClsPrefix } from '../utils/helpers'
import '../../style/components/scroll.less'

export default class Scroll extends React.PureComponent {
  static propTypes = {
    height: PropTypes.number,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    onRefresh: PropTypes.func,
    onEndReached: PropTypes.func,
    onEndReachedThreshold: PropTypes.number,
    children: PropTypes.element,
    refreshing: PropTypes.bool,
    refreshText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    classPrefix: PropTypes.string
  }

  static defaultProps = {
    refreshText: 'Pull To Refresh',
    onEndReachedThreshold: 100,
    refreshing: false,
    classPrefix: 'cha'
  }

  constructor (props) {
    super(props)

    this.state = {
      animation: false,
      height: props.height || '100%',
      offsetY: 0,
      opacity: 0
    }
    this.startY = 0
    this.endY = 0
    this.lastY = 0
    this.offsetY = 0
    this.topThreshold = 50
    this.onEndReachedThreshold = props.onEndReachedThreshold
  }

  componentDidMount () {
    this.onLayout()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.refreshing && !nextProps.refreshing) {
      this.offsetY = 0
      this.setState({
        offsetY: this.offsetY,
        animation: true,
        opacity: 0
      })
    }
  }

  componentDidUpdate () {
    this.onLayout()
  }

  getRootEl = (el) => {
    this.root = el
    this.onLayout()
  }

  getWrapperEl = (el) => {
    this.wrapper = el
    this.onLayout()
  }

  getTopEl = (el) => {
    this.topEl = el
    this.onLayout()
  }

  onLayout = () => {
    if (this.wrapper && this.root) {
      this.contentHeight = this.wrapper.clientHeight + this.wrapper.offsetTop
      this.scrollHeight = this.contentHeight > this.root.clientHeight
        ? (this.contentHeight - this.root.clientHeight) : 0
    }

    if (this.topEl) {
      this.topThreshold = this.topEl.clientHeight
    }
  }

  getTranslate3d = (y) => {
    return `translate3d(0, ${y}px, 0)`
  }

  getOffsetY = (offsetY, isFast) => {
    return Math.min(isFast ? 0 : this.topThreshold, Math.max(offsetY, -this.scrollHeight))
  }

  handleScrollStart = (e) => {
    this.startY = e.touches[0].pageY
    this.lastY = this.startY
    this.startOffsetY = this.offsetY
    this.startTime = Date.now()
  }

  handleScroll = (e) => {
    e.stopPropagation()
    this.endY = e.touches[0].pageY
    const offsetY = this.endY - this.lastY
    this.lastY = this.endY
    this.scrolling = true
    this.offsetY = this.getOffsetY(this.offsetY + offsetY)
    this.setState({
      animation: false,
      offsetY: this.offsetY,
      opacity: this.topThreshold ? this.offsetY / this.topThreshold : 0
    })
  }

  handleScrollEnd = (e) => {
    if (e.changedTouches.length && this.scrolling) {
      this.endY = e.changedTouches[0].pageY
      const endTime = Date.now()
      const time = endTime - this.startTime
      const offsetY = this.endY - this.startY
      const speed = Math.abs(offsetY) / time
      if (speed > 1.5) {
        this.offsetY = this.getOffsetY(this.startOffsetY + speed * offsetY, true)
        this.setState({
          offsetY: this.offsetY,
          animation: true
        })
      } else if (this.topThreshold && this.offsetY >= (this.topThreshold * 0.8)) {
        if (typeof this.props.onRefresh === 'function') {
          this.props.onRefresh()
        }
      } else if (this.offsetY < -(this.scrollHeight - this.onEndReachedThreshold) && this.offsetY < 0) {
        if (typeof this.props.onEndReached === 'function') {
          this.props.onEndReached()
        }
      } else if ((this.topThreshold && this.offsetY < (this.topThreshold * 0.8) && this.offsetY > 0)) {
        this.offsetY = 0
        this.setState({
          offsetY: this.offsetY,
          animation: true
        })
      }

      this.scrolling = false
    }
  }

  render () {
    const { height, animation, offsetY, opacity } = this.state
    const { children, className, wrapperClassName, refreshing, refreshText, classPrefix } = this.props
    const wrapperStyle = {
      transform: this.getTranslate3d(offsetY)
    }
    if (animation) {
      const duration = Math.max(0.3, Math.min(Math.abs(offsetY) / this.contentHeight, 0.8))
      wrapperStyle.transitionDuration = `${duration}s`
    }
    return (
      <div
        ref={this.getRootEl}
        onTouchStart={this.handleScrollStart}
        onTouchMove={this.handleScroll}
        onTouchEnd={this.handleScrollEnd}
        className={classnames([addClsPrefix('scroll-wrapper', classPrefix), className])}
        style={{ height }}>
        <div
          ref={this.getTopEl}
          style={{ opacity }}
          className={addClsPrefix('scroll-top-wrapper', classPrefix)}>
          {refreshing ? (
            <ActivityIndicator className={addClsPrefix('scroll-refresh-indicator', classPrefix)} />
          ) : (
            <span>{refreshText}</span>
          )}
        </div>
        <div
          ref={this.getWrapperEl}
          style={wrapperStyle}
          className={classnames([addClsPrefix('scroll-content-wrapper', classPrefix), wrapperClassName, {
            [addClsPrefix('scroll-in-animation', classPrefix)]: animation
          }])}>{children}</div>
      </div>
    )
  }
}
