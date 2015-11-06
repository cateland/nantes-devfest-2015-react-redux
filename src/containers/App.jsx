import React from 'react'
import MessageList from '../components/MessageList.jsx'
import Input from '../components/Input.jsx';
import {connect} from 'react-redux';
import {receiveMessage, trySendMessage} from '../store/storeConfig.js'
import {onReceiveMessage} from '../chatServices.js'

const styles = {
    App: {
        flex: 1,
        backgroundColor: '#eee',
        display: 'flex',
        flexDirection: 'column'
    },
    MessageList: {
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        height: '0px'
    },
    Input: {
        display: 'flex',
        minHeight:'40px',
        backgroundColor: 'white',
        borderTop: '1px solid #333'
    }
}

const App = React.createClass({
    componentWillMount: function(){
        onReceiveMessage(snapshot => {
            setTimeout(() =>{
                this.props.receiveMessage(snapshot.val());
            }, 1000);
        });
    },
    render: function(){
        return (
            <div style={styles.App}>
                <MessageList style={styles.MessageList} {...this.props}/>
                <Input style={styles.Input} {...this.props}/>
            </div>
        )
    }
});

function selectData(state){
    return {
        messages: state.messages
    }
}

function selectDispatcher(dispatch){
    return {
        receiveMessage: (message) => dispatch(receiveMessage(message)),
        trySendMessage: (message) => dispatch(trySendMessage(message))
    }
}

export default connect(selectData, selectDispatcher)(App);