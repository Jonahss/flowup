// lump of a bunch of components
import React from 'react'
import update from 'immutability-helper';
import VisibilitySensor from 'react-visibility-sensor'
import EventEmitter from 'wolfy87-eventemitter'
import {Message} from './message.jsx'
import _ from 'lodash'

if (!global.scrollState) {
  class ScrollState extends EventEmitter {}
  global.scrollState = new ScrollState()
}

var Flowup = React.createClass({
  getInitialState: function() {
    return {messages: this.props.messages, follow: true}
  },
  render: function() {

    var messagePonents = this.state.messages.slice(1).map(function(message, key) {
      return React.createElement(Message, {message, key, id: key})
    });

    // the last message gets wrapped in a visibility sensor
    var latestMessage = this.state.messages[0]
    var notify = (v) => {
      global.scrollState.emit('scroll', v)
    }

    var lastMessagePonent = React.createElement(Message, {message: latestMessage})
    var visibilitySensor
    if (this.props.detectVisibility) {
      visibilitySensor = React.createElement(VisibilitySensor, {onChange: notify, delay: 100, key: -1}, lastMessagePonent)
    } else {
      visibilitySensor = lastMessagePonent
    }

    messagePonents.unshift(visibilitySensor)

    console.log(`rendering with ${this.state.messages.length} messages`)
    console.log(this.refs)

    return React.createElement('div', {className: 'Flowup'}, messagePonents);
  }
});

var Thread = React.createClass({
  getInitialState: function() {
    // the thread is implemented as a collection of flowup containers. A single flowup container would be nice for holding all the messages, but what about when you scroll up to read scrollback and then catch up with the end. Simpley rendering all the messages which buffered in the meantime causes a jarring jump. Instead we can just add a new, fully populated flowup container and u can scroll down it at your leisure.
    // a thread will always display all the messages in it, but can choose to distribute them over flowup containers in an organic way, don't rely on a pattern.
    var messages = [_.clone(this.props.messageStore.messages)]

    this.props.messageStore.on('newMessage', this.newMessage)

    global.scrollState.on('scroll', (v) => {
      console.log('scroll event fired', v)
      if (v != this.state.follow) {
        if (v && this.state.newMessageBuffer.length) {
          // we are following again, set newMessageBuffer into a new flowup
          var messages = update(this.state.messages, {$push: [this.state.newMessageBuffer]})
          this.setState({messages, newMessageBuffer: []})
        }
        this.setState({follow: v})
      }
    })

    return { messages: messages, follow: true, newMessageBuffer: [] }
  },
  newMessage: function(message) {
    if (this.state.follow) {
      _.last(this.state.messages).unshift(message)
      this.setState({messages: this.state.messages})
    } else {
      console.log('we r updating new message bugger')
      var newMessageBuffer = update(this.state.newMessageBuffer, {$unshift: [message]})
      this.setState({newMessageBuffer})
    }
  },
  render: function() {
    var flowups = this.state.messages.map((messages, i) => { return React.createElement(Flowup, {key: _.last(messages), messages: messages, detectVisibility: i == this.state.messages.length-1})})
    return React.createElement('div', {className: 'Thread'}, flowups);
  }
})

var Viewbox = React.createClass({
  componentDidUpdate: function(prevProps) {
    console.log('number of messages:', this.props.messageStore.messagesLength)
  },
  render: function() {
    let thread = React.createElement(Thread, {messageStore: this.props.messageStore});
    return React.createElement('div', {className: 'viewbox'}, thread);
  }
})



module.exports = { Message, Thread, Viewbox, Flowup }
