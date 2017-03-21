import React from 'react';
import ReactDOM from 'react-dom';

require('./css/index.css');

var Header = React.createClass({
    render: function(){
        return (<div className='header'><h1>Recipe Box</h1></div>);
    }
});

ReactDOM.render(<Header />, document.getElementById('wrapper'));