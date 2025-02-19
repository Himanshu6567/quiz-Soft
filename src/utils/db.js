const initializeDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("quizDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("quizHistory")) {
        db.createObjectStore("quizHistory", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject("Error opening IndexedDB: " + event.target.error);
    };
  });
};

const saveHistory = (userAnswers) => {
  return new Promise((resolve, reject) => {
    initializeDB()
      .then((db) => {
        const transaction = db.transaction("quizHistory", "readwrite");
        const store = transaction.objectStore("quizHistory");
        store.add({ userAnswers, date: new Date() });

        transaction.oncomplete = () => {
          resolve("History saved!");
        };

        transaction.onerror = (event) => {
          reject("Error saving history: " + event.target.error);
        };
      })
      .catch((error) => reject(error));
  });
};

const getHistory = () => {
  return new Promise((resolve, reject) => {
    initializeDB()
      .then((db) => {
        const transaction = db.transaction("quizHistory", "readonly");
        const store = transaction.objectStore("quizHistory");

        const request = store.getAll();
        request.onsuccess = (event) => {
          resolve(event.target.result);
        };

        request.onerror = (event) => {
          reject("Error fetching history: " + event.target.error);
        };
      })
      .catch((error) => reject(error));
  });
};

export { saveHistory, getHistory };
