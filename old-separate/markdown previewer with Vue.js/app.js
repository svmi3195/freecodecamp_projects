var text = '[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)\n\n---\nHeading\n=======\nSub-heading\n-----------\n### Another deeper heading\n\nParagraphs are separated by a blank line.\nLeave 2 spaces at the end of a line to do a  line break\n\nText attributes: *italic*, **bold**, `monospace`, ~~strikethrough~~ .\n\nShopping list:\n* apples\n* oranges\n* pears\n\nNumbered list:\n1. apples\n2. oranges\n3. pears\n\nThe rain---not the reign---in Spain.';

var app = new Vue({
  el: '#app',
  data: {
    rawText: text,
    marked: marked(text)
  },
  methods: {
    update: function(x) {
      return marked(x);
    }
  }
});