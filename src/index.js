var React = require('react');
require('./style.css');

var App = React.createClass({
	render: function(){
		return (	
			<h1>It work</h1>
		)
	}
});
React.render(<App/>, document.getElementById('app'));