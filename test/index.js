import chai, {expect} from 'chai';
import {createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux';
import thunk from 'redux-thunk'

// test 1
describe('Redux create store', () => {

	it('Initialisation d\'un store basique', () => {

    	// utiliser createStore avec au moins un reducer
    	
    	expect(store).is.not.empty;
  	});

  	it('Initialisation d\'un store avec un etat initial', () => {
  		// un état initial pue être un primitif, un tableau, un objet
    	expect(store.getState()).to.eql({valeur: 'valeur'});
  	});

});

// test 2
describe('Redux dispatch', () => {

	it('dispatch d\'une action entrainant une modification de l\'état', () => {	


		const store = createStore(reducer, {valeur: 'valeur initiale'});
		expect(store.getState()).to.eql({valeur: 'valeur initiale'});

		// dispatch d'une action

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

		// expect
		fail();
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
		fail();
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
		//  suscribe

		store.dispatch({type: 'MODIFIER_STORE', valeur: 'nouvelle valeur'});
		
	})
})


// test 6
describe('Redux combine reducers', () => {

	it('On combine deux reducers et on obtient un store avec un état combiné', function(){
		// creer deux reducers correspondants aux actions

		// les combiner

		const store = createStore(rootReducer);
		expect(store.getState()).to.eql({messages: [], users: []});
		store.dispatch({type: 'ADD_MESSAGE', message: 'nouveau message'});
		store.dispatch({type: 'ADD_USER', user: 'nouvel utilisateur'});
		expect(store.getState()).to.eql({messages: ['nouveau message'], users: ['nouvel utilisateur']});
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

		expect(store.getState()).to.eql({valeur: 'valeur initiale'});
		store.subscribe(() => {
			expect(store.getState()).not.eql({valeur: 'valeur initiale'});
			expect(store.getState()).to.eql({valeur: 'nouvelle valeur'});
			done();
		});

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

		

		// creer un store en utilisant ce middleware

		expect(store.getState()).to.eql({valeur: 'valeur initiale'});

		store.subscribe(() => {
			expect(store.getState()).not.eql({valeur: 'valeur initiale'});
			expect(store.getState()).to.eql({valeur: 'nouvelle valeur'});
			done();
		});

		store.dispatch({type: 'MODIFIER_STORE', valeur: 'nouvelle valeur'});
	});

	it('utiliser redux thunk', done => {
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


		// creer un store avec thunk + logger


		
		
		
		// dispatch de l'action

		expect(store.getState()).to.eql('debut du traitement');
	})
})