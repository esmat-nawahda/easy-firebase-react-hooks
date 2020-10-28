import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";

import useRTDatabaseList from "../src/firebase-hooks/useRTDatabaseList";
import useRTDatabaseValue from "../src/firebase-hooks/useRTDatabaseValue";

// Firebase Config
const config = {
  apiKey: "AIzaSyAr9ICuLA34b9HYXX_QihIqR7iUTl5ihoo",
  authDomain: "forex-16c8a.firebaseapp.com",
  databaseURL: "https://forex-16c8a.firebaseio.com",
  projectId: "forex-16c8a",
  storageBucket: "forex-16c8a.appspot.com",
  messagingSenderId: "747165846668",
  appId: "1:747165846668:web:29f34828ce77b5d29dffa9",
  measurementId: "G-VNJZD35VCV"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const Example = () => {
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
  ] = useRTDatabaseList("conversations/5f6df949e3b8b00960ce371a/messages", 3);
  const [rtValue, setValue] = useRTDatabaseValue(
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

ReactDOM.render(<Example />, document.getElementById("root"));