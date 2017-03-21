import React from 'react';
import ReactDOM from 'react-dom';

require('./css/index.css');

var Header = React.createClass({
    render: function(){
        return (<div class='my-header'><h1>I am the header</h1></div>);
    }
});

ReactDOM.render(<Header />, document.getElementById('wrapper'));