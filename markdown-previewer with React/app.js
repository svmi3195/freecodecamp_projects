var MainContainer = React.createClass({
  getInitialState: function(){
    return({
      text: '[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)\n\n---\nHeading\n=======\nSub-heading\n-----------\n### Another deeper heading\n\nParagraphs are separated by a blank line.\nLeave 2 spaces at the end of a line to do a  line break\n\nText attributes *italic*, **bold**, `monospace`, ~~strikethrough~~ .\n\nShopping list:\n* apples\n* oranges\n* pears\n\nNumbered list:\n1. apples\n2. oranges\n3. pears\n\nThe rain---not the reign---in Spain.'
    });
  },
  
  render: function(){
    return (<div className='row expanded'>
        <div className='column small-12 medium-6'>
        <textarea className="text" ref='newText' onChange={this.handleChange}>{this.state.text}</textarea>
        </div>
        <div className='column small-12 medium-6'>
        <div dangerouslySetInnerHTML={{__html: marked(this.state.text)}} />
        </div>
      </div>);
  },
  
  handleChange: function(){
    this.setState({text: this.refs.newText.value});
  }
});

ReactDOM.render(<MainContainer />, document.getElementById('wrapper'));