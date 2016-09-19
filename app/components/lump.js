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
  componentDidUpdate: function(prevProps) {
    console.log('number of messages:', this.props.messagesLength)
  },
  render: function() {
    let thread = React.createElement(Thread, {messages: this.props.messages});
    return React.createElement('div', {className: 'viewbox'}, thread);
  }
})

var Textbox = React.createClass({
  render: function() {
    return React.createElement('input', {type: 'textbox', className: 'Textbox'});
  }
});

module.exports = { Message, Thread, Viewbox, Textbox }
