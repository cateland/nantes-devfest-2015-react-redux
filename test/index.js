import chai, {expect} from 'chai';
import {createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux';
import thunk from 'redux-thunk'

// test 1
describe('Redux create store', () => {

	it('Initialisation d\'un store basique', () => {
		const reducer = function(state, action){
			return state;
		}
    	// utiliser createStore avec au moins un reducer
    	const store = createStore(reducer);
    	expect(store).is.not.empty;
  	});

  	it('Initialisation d\'un store avec un etat initial', () => {
  		const reducer = function(state = "test", action){
			return state;
		}
  		// un état initial pue être un primitif, un tableau, un objet
    	const store = createStore(reducer);
    	expect(store.getState()).to.eql("test");
  	});

});
// test 2
describe('Redux dispatch', () => {

	it('dispatch d\'une action entrainant une modification de l\'état', () => {	

		const reducer = function(state, action){
			switch(action.type){
				case 'MODIFIER_STORE':
					return Object.assign({}, state, {valeur: action.valeur});
				default:
					return state;
			}
		}

		const store = createStore(reducer, {valeur: 'valeur initiale'});
		expect(store.getState()).to.eql({valeur: 'valeur initiale'});
		const actionCreator = function(valeur){
			return {
				type:'MODIFIER_STORE',
				valeur
			}
		}
		// dispatch d'une action
		store.dispatch(actionCreator('nouvelle valeur'));

		expect(store.getState()).to.eql({valeur: 'nouvelle valeur'});
	});
});

// test 3
describe('tester un action creator', () => {
	it('quand celui-ci contient de la logique', () =>{
		const actionCreator =  (message) => {
			if(message){
				return {
					type: 'ENVOYER_MESSAGE',
					message
				}
			}
			return {
				type: 'MESSAGE_INVALIDE'
			}
			
		}
		expect(actionCreator('message'))
			.to.eql({type: 'ENVOYER_MESSAGE', message: 'message'})
		// expect
	})

})

// test 4
describe('tester un reducer', () => {
	it('en lui fournissant un state et une action', ()=> {
		const reducer = (state, action) => {
			switch (action.type){
				case 'AJOUTER_MESSAGE':
					return [...state, action.message];
				default:
					return state;
			}
		}

		expect(
			reducer(
				['ancien message'], 
				{type: 'AJOUTER_MESSAGE', message: 'nouveau message'}))
			.to.eql(['ancien message', 'nouveau message'])
	})
})

// test 5
describe('Redux suscribe', () => {
	it('on peut enregistrer un listener sur le store pour être notifier de ses mise a jour', done => {
		const reducer = function(state, action){
			switch(action.type){
				case 'MODIFIER_STORE':
					return Object.assign({}, state, {valeur: action.valeur});
				default:
					return state;
			}
		}

		const store = createStore(reducer, {valeur: 'valeur initiale'});
		expect(store.getState()).to.eql({valeur: 'valeur initiale'});
		store.subscribe(function(){
			expect(store.getState()).to.eql({valeur: 'nouvelle valeur'})
			done();
		});

		store.dispatch({type: 'MODIFIER_STORE', valeur: 'nouvelle valeur'});
		
	})
})


// test 6
describe('Redux combine reducers', () => {

	it('On combine deux reducers et on obtient un store avec un état combiné', function(){
		// creer deux reducers correspondants aux actions
		const messageReducer = function(state = [], action){
			switch(action.type){
				case 'ADD_MESSAGE':
					return [...state, action.message]
				default:
					return state;
			}
		}

		const userReducer = function(state = [], action){
			switch(action.type){
				case 'ADD_USER':
					return [...state, action.user]
				default:
					return state;
			}
		}
		// les combiner
		const rootReducer = 
		combineReducers({messages: messageReducer, users: userReducer})

		const store = createStore(rootReducer);
		expect(store.getState()).to.eql({messages: [], users: []});
		store.dispatch({type: 'ADD_MESSAGE', message: 'nouveau message'});
		store.dispatch({type: 'ADD_USER', user: 'nouvel utilisateur'});

		expect(store.getState())
		.to.eql({messages: ['nouveau message'], users: ['nouvel utilisateur']});
	})

});


// test 7
describe('Redux bindActionsCreators', () => {
	it('permet d\'appeler un action creator qui s\'auto dispatch', done => {
		const reducer = function(state, action){
			switch(action.type){
				case 'MODIFIER_STORE':
					return Object.assign({}, state, {valeur: action.message});
				default:
					return state;
			}
		}

		const addMessage = message => {
			return {
				type: 'MODIFIER_STORE',
				message
			}
		}

		const store = createStore(reducer, {valeur: 'valeur initiale'});

		// bind de l'action creator
		const bindedActionCreator = 
			bindActionCreators(addMessage, store.dispatch);

		expect(store.getState()).to.eql({valeur: 'valeur initiale'});
		store.subscribe(() => {
			expect(store.getState()).not.eql({valeur: 'valeur initiale'});
			expect(store.getState()).to.eql({valeur: 'nouvelle valeur'});
			done();
		});

		bindedActionCreator('nouvelle valeur');
		// appel de celui-ci
	})
});

// test 8
describe('Redux applyMiddleware', () => {
	it('wrapper la methode dispatch avec un logger', done => {

		const reducer = (state, action) => {
			switch(action.type){
				case 'MODIFIER_STORE':
					return Object.assign({}, state, {valeur: action.valeur});
				default:
					return state;
			}
		}


		// creer un logger ({ getState, dispatch }) => next => action : result
		const logger = ({getState, dispatch}) => next => action => {
			console.info('etat initial', getState());
			console.info('action', action);
			const result = next(action);
			console.info('nouvel etat', getState());
			return result;
		}
		

		// creer un store en utilisant ce middleware
		const createStoreWithMiddleware =
		  applyMiddleware(logger)(createStore);

		const store = createStoreWithMiddleware(
			reducer, {valeur: 'valeur initiale'});

		expect(store.getState()).to.eql({valeur: 'valeur initiale'});

		store.subscribe(() => {
			expect(store.getState()).not.eql({valeur: 'valeur initiale'});
			expect(store.getState()).to.eql({valeur: 'nouvelle valeur'});
			done();
		});

		store.dispatch({type: 'MODIFIER_STORE', valeur: 'nouvelle valeur'});
	});

	it('utiliser redux thunk', () => {

		const logger = ({getState, dispatch}) => next => action => {
			console.info('etat initial', getState());
			console.info('action', action);
			const result = next(action);
			console.info('nouvel etat', getState());
			return result;
		}
		const reducer = (state = '', action) => {
			switch(action.type){
				case 'DEBUT_ASYNC':
					return 'debut du traitement';
				case 'FIN_ASYNC':
					return 'traitement fini';
				default:
					return state;
			}
		}

		const debutTraitement = () => {
			return {
				type: 'DEBUT_ASYNC'
			}
		}

		const finTraitement = () => {
			return {
				type: 'FIN_ASYNC'
			}
		}

		const asynchronousActionCreator = () => {
			return (getState, dispatch) => {
				dispatch(debutTraitement());
				setTimeout(() => {
					dispatch(finTraitement());
				}, 2000)
			}
		}


		// creer un store avec thunk + logger
		const createStoreWithMiddleware = 
			applyMiddleware(thunk, logger)(createStore);

		const store = createStoreWithMiddleware(reducer);

		
		store.dispatch(asynchronousActionCreator());
		
		// dispatch de l'action

		expect(store.getState()).to.eql('debut du traitement');
	})
})