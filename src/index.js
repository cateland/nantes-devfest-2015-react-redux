import React from 'react';
import ReactDOM from 'react-dom';

const styles = {maxWidth:'50%', flex: 1, display: 'flex', flexDirection: 'column'};


var App = React.createClass({
	render: function(){
		return (	
			<h1>It work</h1>
		)
	}
});
ReactDOM.render(<App/>, document.getElementById('app'));

// AppStyle
// const styles = {
//     App: {
//         flex: 1,
//         backgroundColor: '#eee',
//         display: 'flex',
//         flexDirection: 'column'
//     },
//     MessageList: {
//         flex:1,
//         display: 'flex',
//         flexDirection: 'column',
//         overflowY: 'auto',
//         height: '0px'
//     },
//     Input: {
//         display: 'flex',
//         minHeight:'40px',
//         backgroundColor: 'white',
//         borderTop: '1px solid #333'
//     }
// }

// //Message style
// const styles = {
//     Message: {
//         backgroundColor: 'white',
//         margin: '1em',
//         padding: '1em',
//         minHeight: '1em'
//     },
//     Renvoyer: {
//     	color: 'white',
//     	border: 'none',
//     	backgroundColor: 'red',
//     	padding: '.3 1em',
//     	float: 'right'
//     }
// }

// // input style
// const styles =  {
//     input: {
//         flex: 1,
//         padding: '0 1em',
//         border: 'none'
//     },
//     button: {
//         border: 'none'
//     }
// }