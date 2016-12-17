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

  addMessage (message) {
    this.messages.unshift(message)
    this.messagesLength = this.messages.length
    this.emit('newMessage')
  }
}

var sampleMessages = ['hi', 'yo', 'hello', 'chuckwudi', "it's raining today", 'i just got engaged!', 'that sux :(', "how's it goin?"];
var messageStore = new MessageStore([_.sample(sampleMessages), _.sample(sampleMessages), _.sample(sampleMessages)])

var createMessage = function() {
  messageStore.addMessage(_.sample(sampleMessages))
}

var renderView = function(messageStore) {
  var viewbox = React.createElement(Viewbox, {messageStore: messageStore})
  var textbox = React.createElement(Textbox, {viewbox: viewbox})
  var newMessageIndicator = React.createElement(EventIndicator, {name: 'newMessage', color: 'pink', emitter: messageStore, event: 'newMessage'})
  var scrollIndicator = React.createElement(BoolIndicator, {name: 'scroll', bool: true, emitter: global.scrollState, event: 'scroll'})
  var components = ReactDOM.render(React.createElement('div', {}, newMessageIndicator, scrollIndicator, viewbox, textbox),document.getElementById('reactContainer'))
}

document.addEventListener('DOMContentLoaded', async () => {
  renderView(messageStore)
  setInterval(createMessage, 400)


  let p = new Promise((resolve) => {
    resolve('alive')
  })
  console.log(await p)

});
