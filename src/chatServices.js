import Firebase from 'firebase';

const ref = new Firebase('https://supercat.firebaseio.com/');

let timestamp = 0;

ref.child('.info/serverTimeOffset').on('value', (snapshot) => {
  timestamp = snapshot.val();
})

export function sendMessage(message, callback){
  ref.child('messages').push(message, callback);
}

export function onReceiveMessage(callback){
  const ref = new Firebase('https://supercat.firebaseio.com/messages');
  ref.on('child_added', callback);  
}

export default timestamp;