import 'babel-polyfill'
import ReactDOM from 'react-dom';
import React from 'react';
import _ from 'lodash';
import {Viewbox} from 'components/lump'
import {Textbox} from 'components/textbox'
import {EventIndicator, BoolIndicator} from 'components/indicator'
import EventEmitter from 'wolfy87-eventemitter'

class MessageStore extends EventEmitter {
  constructor (startingMessages) {
    super()

    this.messages = startingMessages
    this.messagesLength = this.messages.length
  }
}

var sampleMessages = ['hi', 'yo', 'hello', 'chuckwudi', "it's raining today", 'i just got engaged!', 'that sux :(', "how's it goin?"];
var messageStore = new MessageStore([_.sample(sampleMessages), _.sample(sampleMessages), _.sample(sampleMessages)])

var createMessage = function() {
  messageStore.messages.unshift(_.sample(sampleMessages))
  messageStore.messagesLength = messageStore.messages.length
  messageStore.emit('newMessage')
  renderView(messageStore)
}

class ScrollState extends EventEmitter {

}
var scrollState = new ScrollState();
global.scrollState = scrollState

var renderView = function(messageStore) {
  var viewbox = React.createElement(Viewbox, {messages: messageStore.messages, messagesLength: messageStore.messagesLength})
  var textbox = React.createElement(Textbox, {viewbox: viewbox})
  var newMessageIndicator = React.createElement(EventIndicator, {name: 'newMessage', color: 'pink', emitter: messageStore, event: 'newMessage'})
  var scrollIndicator = React.createElement(BoolIndicator, {name: 'scroll', bool: true, emitter: scrollState, event: 'scroll'})
  var components = ReactDOM.render(React.createElement('div', {}, newMessageIndicator, scrollIndicator, viewbox, textbox),document.getElementById('reactContainer'))
}

document.addEventListener('DOMContentLoaded', async () => {
  renderView(messageStore)
  setInterval(createMessage,500)


  let p = new Promise((resolve) => {
    resolve('alive')
  })
  console.log(await p)

});
