import 'babel-polyfill'
import ReactDOM from 'react-dom';
import React from 'react';
import _ from 'lodash';
import {Viewbox, Textbox} from 'components/lump'
import {Indicator} from 'components/indicator'
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
  messageStore.emitEvent('newMessage')
  renderView(messageStore)
}

var renderView = function(messageStore) {
  var viewbox = React.createElement(Viewbox, {messages: messageStore.messages, messagesLength: messageStore.messagesLength})
  var textbox = React.createElement(Textbox, {viewbox: viewbox})
  var indicator = React.createElement(Indicator, {name: 'newMessage', color: 'pink', emitter: messageStore, event: 'newMessage'})
  var components = ReactDOM.render(React.createElement('div', {}, indicator, viewbox, textbox),document.getElementById('reactContainer'))
}

document.addEventListener('DOMContentLoaded', async () => {
  renderView(messageStore)
  setInterval(createMessage,500)


  let p = new Promise((resolve) => {
    resolve('alive')
  })
  console.log(await p)

});
