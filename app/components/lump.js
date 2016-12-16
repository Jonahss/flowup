// lump of a bunch of components
import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import {Message} from './message.jsx'
import _ from 'lodash'


var Thread = React.createClass({
  render: function() {

    var messagePonents = this.props.messages.slice(1).map(function(message, key) {
      return React.createElement(Message, {message, key})
    });

    // the last message gets wrapped in a visibility sensor
    var latestMessage = this.props.messages[0]
    var notify = function(v) {
      global.scrollState.emit('scroll', v)
    }
    var lastMessagePonent = React.createElement(Message, {message: latestMessage})
    var visibilitySensor = React.createElement(VisibilitySensor, {onChange: notify, delay: 100, key: -1})

    messagePonents.unshift(visibilitySensor)

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



module.exports = { Message, Thread, Viewbox }
