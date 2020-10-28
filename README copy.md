# easy-firebase-react-hooks


[A full example for FirebaseHooks.useRTDatabaseList & FirebaseHooks.useRTDatabaseValue ⚡️]

```node
import React from "react";
import firebase from "firebase";
import FirebaseHooks from "easy-firebase-react-hooks";

// Firebase Config, this is for showing our example only
// Add your firebase config and init it in different file
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}


// Example starts here
export default function App() {
  const [
    allData,
    pageData,
    total,
    loading,
    error,
    numberOfPages,
    page,
    prevPage,
    nextPage,
    visitPage,
    addRecord
  ] = FirebaseHooks.useRTDatabaseList(
    "conversations/5f6df949e3b8b00960ce371a/messages",
    3
  );
  const [rtValue, setValue] = FirebaseHooks.useRTDatabaseValue(
    "/conversations/5f6df949e3b8b00960ce371a/createdAt"
  );

  const addItemToList = () => {
    addRecord({
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      testKey: "TEST TEST TEST"
    });
  };

  const setRTValue = () => {
    setValue({
      testKey: "TEST TEST TEST"
    });
  };

  return (
    <div>
      <h1>
        Hello Firebase Hooks ({page}/{numberOfPages})
      </h1>
      <button onClick={prevPage}>PREV</button>
      <button onClick={nextPage}>NEXT</button>
      <button onClick={() => visitPage(7)}>Go to page</button>
      <button onClick={() => addItemToList()}>Add record</button>
      {loading ? <div>Loading...</div> : <p>{JSON.stringify(pageData)}</p>}
      <hr />
      <h3>{rtValue}</h3>
      <button onClick={() => setRTValue()}>Set record</button>
    </div>
  );
}
```
