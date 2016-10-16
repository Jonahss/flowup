import React from 'react'

let opacityChange = .3
let framerate = 100 //ms

class EventIndicator extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      opacity: 0,
      hitcount: 0,
    }
  }
  flash(duration) {
    this.setState({
      opacity: 1,
      hitcount: this.state.hitcount + 1
    })
  }
  fade() {
    let fad = function() {
      this.setState({opacity: this.state.opacity - opacityChange});
    }.bind(this)

    setTimeout(fad, framerate);
  }
  componentDidMount() {
    var flash = function() {
      this.flash()
    }.bind(this)

    this.props.emitter.on(this.props.event, flash)
  }
  componentWillUnmount() {
    this.props.emitter.off(this.props.event)
  }
  componentDidUpdate(prevProps) {
    let self = this
    if (this.state.opacity > 0) {
      this.fade()
    }
  }
  render() {
    let name = `indicator-${this.props.name}`
    let color = this.props.color

    let style = {
      width: '10px',
      height: '10px',
      backgroundColor: color,
      opacity: this.state.opacity,
    }

    return <div key={name} id={name} className="jss-indicator" style={style}></div>
  }
}

class BoolIndicator extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      bool: this.props.bool
    }
  }
  flip(bool) {
    console.log('FLIP', this)
    this.setState({bool})
  }
  componentDidMount() {
    var flip = function(bool) {
      this.flip(bool)
    }.bind(this)

    this.props.emitter.on(this.props.event, flip)
  }
  componentWillUnmount() {
    this.props.emitter.off(this.props.event)
  }
  render() {
    let name = `indicator-${this.props.name}`
    let color = this.state.bool ? 'blue' : 'red'

    let style = {
      width: '10px',
      height: '10px',
      backgroundColor: color,
    }

    return <div key={name} id={name} className="jss-indicator" style={style}></div>
  }
}

module.exports = {
  EventIndicator: EventIndicator,
  BoolIndicator: BoolIndicator,
}
