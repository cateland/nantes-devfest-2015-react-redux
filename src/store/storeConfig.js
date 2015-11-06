import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import timestamp, {sendMessage} from '../chatServices.js';
import DevTools from '../containers/Devtools.jsx';
import chatReducer from '../reducers/chat.js';

function addMessage(message){
	return {
		type: 'ADD_MESSAGE',
		message
	}
}

function addOrUpdateMessage(message){
	return {
		type: 'ADD_OR_UPDATE_MESSAGE',
		message
	}
}

export function receiveMessage(message){
	return addOrUpdateMessage(message);
}

export function trySendMessage(message){
	return (dispatch, getState) => {
		const messageObject = {
			id: Date.now() + timestamp,
			author: getState().author, 
			message: message, 
			status: 'SENDING'
		}
		dispatch(addMessage(messageObject));
		sendMessage(Object.assign({},messageObject, {status: 'SENT'}), error => {
			if(error){
				dispatch(messageNotSent(Object.assign({}, messageObject, {status: 'NOT_SENT'})));
			}
		});
	}
}


const createStoreWithMiddleWare = compose(
		applyMiddleware(thunk),
		DevTools.instrument()
	)(createStore);

let store = createStoreWithMiddleWare(chatReducer);



export default store;