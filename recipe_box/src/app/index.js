import React from 'react';
import ReactDOM from 'react-dom';

require('./css/index.css');

var AddBtn = React.createClass({
    render: function(){
        return (<button className='addBtn'>+</button>);
    }
});

var Header = React.createClass({
    render: function(){
        return (<div className='header'><h1>Recipe Box  </h1> <AddBtn /></div>);
    }
});



ReactDOM.render(
    <div>
    <Header />
    
    </div>, document.getElementById('wrapper'));