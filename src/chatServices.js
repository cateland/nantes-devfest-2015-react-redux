var Firebase = require('firebase/lib/firebase-web');

var ref = new Firebase('https://supercat.firebaseio.com/');

var serverTimeOffset = 0;

ref.child('.info/serverTimeOffset').on('value', (snapshot) => {
  serverTimeOffset = snapshot.val();
});


/**
 * permet d'envoyer un message a firebase
 */
export function sendMessage(author, content) {
  ref.child('messages').push({
    timestamp: Date.now() + serverTimeOffset,
    author,
    content
  });
}

/**
 * permet d'enregistrer un callback sur la reception 
 * de nouvelles valeurs correspondant a la requete
 */
export function receiveMessage(callback) {

  ref.child('messages').limitToLast(100).on('value', (snapshot) => {
    var messages = [];

    snapshot.forEach(function(s) {
      messages.push(s.val());
    });
    callback(messages)

  });
}
