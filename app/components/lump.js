// lump of a bunch of components
import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import EventEmitter from 'wolfy87-eventemitter'
import {Message} from './message.jsx'
import _ from 'lodash'

if (!global.scrollState) {
  class ScrollState extends EventEmitter {}
  global.scrollState = new ScrollState()
}

var Thread = React.createClass({
  newMessage: function() {
    if (this.state.follow) {
      this.setState({messages: this.props.messageStore.messages})
    }
  },
  getInitialState: function() {
    this.props.messageStore.on('newMessage', this.newMessage)

    return {messages: this.props.messageStore.messages, follow: true}
  },
  render: function() {

    var messagePonents = this.state.messages.slice(1).map(function(message, key) {
      return React.createElement(Message, {message, key, id: key})
    });

    // the last message gets wrapped in a visibility sensor
    var latestMessage = this.state.messages[0]
    var notify = (v) => {
      global.scrollState.emit('scroll', v)
      if (v != this.state.follow) {
        this.setState({follow: v})
      }
    }
    var lastMessagePonent = React.createElement(Message, {message: latestMessage})
    var visibilitySensor = React.createElement(VisibilitySensor, {onChange: notify, delay: 100, key: -1}, lastMessagePonent)

    messagePonents.unshift(visibilitySensor)

    console.log(`rendering with ${this.state.messages.length} messages`)
    console.log(this.refs)

    return React.createElement('div', {className: 'Thread'}, messagePonents);
  }
});

var Viewbox = React.createClass({
  componentDidUpdate: function(prevProps) {
    console.log('number of messages:', this.props.messageStore.messagesLength)
  },
  render: function() {
    let thread = React.createElement(Thread, {messageStore: this.props.messageStore});
    return React.createElement('div', {className: 'viewbox'}, thread);
  }
})



module.exports = { Message, Thread, Viewbox }
