import firebase from 'firebase';

function read(ref, callback) {
  const myRef = firebase.database().ref(ref);
  if (callback) {
    return myRef.on('value', (snapshot) => {
      callback(snapshot.val());
    });
  }
  return myRef.once('value');
}

function set(ref, payload) {
  const promise = firebase.database().ref(ref).set(payload);
  promise.then((response) => console.log('RESPONSE FROM SET', response));
  console.log('PROMISE', promise);
  return promise;
}

function update(ref, payload) {
  const updates = {};

  if (Array.isArray(ref)) {
    ref.forEach((r) => {
      updates[r] = payload;
    });
  } else {
    updates[ref] = payload;
  }

  return firebase.database().ref().update(updates);
}

export {
  read,
  set,
  update,
};

