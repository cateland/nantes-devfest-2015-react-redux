import React from 'react';

const styles =  {
    input: {
        flex: 1,
        padding: '0 1em',
        border: 'none'
    },
    button: {
        border: 'none'
    }
}

const Input =  React.createClass({
    _handleClick: function(){
    	const value = this.refs.input.value;
    	if("" !== value){
    		this.props.trySendMessage(this.refs.input.value)
        	this.refs.input.value = '';
    	}
    },
    render: function(){
        return (
            <div {...this.props}>
                <input ref="input" style={styles.input} type="text" />
                <button  onClick={this._handleClick} style={styles.button} >Envoyer</button>
            </div>
        );
    }
});



export default Input;