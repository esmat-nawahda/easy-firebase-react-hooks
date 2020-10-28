import { useState, useEffect, useCallback } from "react";
import firebase from "firebase";

const useRTDatabaseValue = path => {
  const [rtValue, setRTValue] = useState(null);

  useEffect(() => {
    const ref = firebase.database().ref(path);
    ref.once(
      "value",
      snapshot => {
        if (snapshot) {
          setRTValue(snapshot.val());
        }
      },
      err => {
        setError(err);
        console.log("The read failed: " + errorObject.code);
      }
    );
  }, []);

  const setValue = useCallback(record => {
    firebase
      .database()
      .ref(path)
      .set(record, error => {
        if (error) {
          // The write failed...
          console.log("Failure on adding new record");
        } else {
          // Data saved successfully!
          console.log("Record added successfully");
        }
      });
  });

  return [rtValue, setValue];
};

export default useRTDatabaseValue;
