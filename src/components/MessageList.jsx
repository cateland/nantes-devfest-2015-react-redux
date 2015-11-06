import React from 'react';
import Message from './Message.jsx';



const MessageList =  React.createClass({
    render: function(){
        return (
            <div {...this.props} >
                {this.props.messages.map(this._renderMessages)}
            </div>
        );
    },
    _renderMessages: function(element){
        return (<Message key={element.id} message={element} />)
    }
});



export default MessageList;