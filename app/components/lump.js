// lump of a bunch of components
import React from 'react'

var Message = React.createClass({
  render: function() {
    return React.createElement('div', {className: "Message"}, this.props.message);
  }
});

var Thread = React.createClass({
  render: function() {
    var messagePonents = this.props.messages.map(function(message, key) {
      return React.createElement(Message, {message, key})
    });
    return React.createElement('div', {className: 'Thread'}, messagePonents);
  }
});

var Viewbox = React.createClass({
  getInitialState: function() {
    return {pink: 0}
  },
  componentDidUpdate: function(prevProps) {
    console.log('number of messages:', this.props.messagesLength)
    if (this.props.messagesLength > prevProps.messagesLength) {
      this.setState({pink: 1})
    }
  },
  fade: function() {
    let fad = function() {
      this.setState({pink: this.state.pink-1});
    }.bind(this)

    setTimeout(fad, 100);
  },
  render: function() {
    var bgColor = 'white';
    if (this.state.pink > 0) {
      bgColor = 'pink';
      this.fade();
    }

    var style = {
      backgroundColor: bgColor
    }

    let thread = React.createElement(Thread, {messages: this.props.messages});
    return React.createElement('div', {className: 'viewbox', style: style}, thread);
  }
})

var Textbox = React.createClass({
  render: function() {
    return React.createElement('input', {type: 'textbox', className: 'Textbox'});
  }
});

module.exports = { Message, Thread, Viewbox, Textbox }
