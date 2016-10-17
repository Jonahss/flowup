import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'

var Message = React.createClass({
  render: function() {
    return <div className="Message">{this.props.message}</div>
  }
});

export {Message}
