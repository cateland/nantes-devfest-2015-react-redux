const chatReducer = function chat(state = {messages: [], author: 'Axel'}, action){
	let messages;
	switch(action.type){
		case 'ADD_MESSAGE':
			return Object.assign({}, state, {messages: [...state.messages, action.message]});
		case 'ADD_OR_UPDATE_MESSAGE':
			messages = state.messages.filter(message => message.id !== action.message.id)
			return Object.assign({}, state, {messages: [...messages, action.message]});
		default:
			return state
	}
}

export default chatReducer;