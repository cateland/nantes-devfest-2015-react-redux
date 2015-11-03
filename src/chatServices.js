const Firebase = require('firebase/lib/firebase-web');

const ref = new Firebase('https://supercat.firebaseio.com/');

let timestamp = 0;

ref.child('.info/serverTimeOffset').on('value', (snapshot) => {
  timestamp = Date.now() + snapshot.val();
});


/**
 * permet d'envoyer un message a firebase
 */
export function sendMessage(message, callback) {
  ref.child('messages').push(message, callback);
}

/** 
 * permet de recevoir des messages un par un
 */
export function onReceiveMessage(callback){
  const ref = new Firebase('https://supercat.firebaseio.com/messages');
  ref.on('child_added', callback);  
}

/**
 * permet d'enregistrer un callback sur la reception 
 * de nouvelles valeurs correspondant a la requete
 */
export function receiveMessage(callback) {

  ref.child('messages').limitToLast(100).on('value', (snapshot) => {
    let messages = [];

    snapshot.forEach(function(s) {
      messages.push(s.val());
    });
    callback(messages)

  });
}

export default timestamp;
