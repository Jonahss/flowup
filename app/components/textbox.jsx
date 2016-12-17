import React from 'react'

var Textbox = React.createClass({
  render: function() {
    return React.createElement('input', {type: 'textbox', className: 'Textbox'});
  }
});

export {Textbox}
