import React from 'react';

const styles = {
    Message: {
        backgroundColor: 'white',
        margin: '1em',
        padding: '1em',
        minHeight: '1em'
    },
    Renvoyer: {
    	color: 'white',
    	border: 'none',
    	backgroundColor: 'red',
    	padding: '.3 1em',
    	float: 'right'
    }
}

const Message = React.createClass({
    render: function(){
        return(
        	<span style={styles.Message}>
        		<strong>{this.props.message.author} : </strong>{this.props.message.message}
        		{this._renderResend()}
        	</span>
        )
    },
    _renderResend: function(){
    	if('SENDING' === this.props.message.status){
    		return <span style={styles.Renvoyer}>sending</span>
    	} else if ('NOT_SENT' === this.props.message.status){
    		return <button style={styles.Renvoyer}>Renvoyer</button>
    	}
    	return null;
    }
});

export default Message;