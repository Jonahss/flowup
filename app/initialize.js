import 'babel-polyfill'
import ReactDOM from 'react-dom';
import React from 'react';
import _ from 'lodash';
import {Viewbox, Textbox} from 'components/lump'

var sampleMessages = ['hi', 'yo', 'hello', 'chuckwudi', "it's raining today", 'i just got engaged!', 'that sux :(', "how's it goin?"];
var messages = [_.sample(sampleMessages), _.sample(sampleMessages), _.sample(sampleMessages)]
var messageStore = {messages: messages, messagesLength: messages.length}

var createMessage = function() {
  messageStore.messages.unshift(_.sample(sampleMessages))
  messageStore.messagesLength = messageStore.messages.length
  renderView(messageStore)
}

var renderView = function(messageStore) {
  var viewbox = React.createElement(Viewbox, messageStore)
  var textbox = React.createElement(Textbox, {viewbox: viewbox})
  ReactDOM.render(React.createElement('div', {}, viewbox, textbox),document.getElementById('reactContainer'))
}

document.addEventListener('DOMContentLoaded', async () => {
  renderView(messageStore)
  setInterval(createMessage,450)


  let p = new Promise((resolve) => {
    resolve('alive')
  })
  console.log(await p)

});
