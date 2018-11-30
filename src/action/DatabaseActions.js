import { Actions } from "react-native-router-flux";
import { GET_WORDS, GET_SENTENCES, ADD_WORD, DELETE_WORD } from "./types";

import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: "Database.db" });
var words = [];
var sentences = [];

export const getData = () => {
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM words", [], (tx, results) => {
      var len = results.rows.length;
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        word = {
          id: row.id,
          name: row.name,
          meaning: row.meaning,
          translation: row.translation,
          archive: row.archive,
          examples: row.examples,
          level: row.level
        };
        words.push(word);
      }
    });
    tx.executeSql("SELECT * FROM sentences", [], (tx, results) => {
      var len = results.rows.length;
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        sentence = {
          id: row.id,
          name: row.name,
          meaning: row.meaning,
          translation: row.translation,
          archive: row.archive,
          level: row.level
        };
        sentences.push(sentence);
      }
    });
  });
};

export const getWords = () => {
  // console.log(words);
  return {
    type: GET_WORDS,
    words
  };
};

export const getSentences = () => {
  return {
    type: GET_SENTENCES,
    sentences
  };
};

export const addWord = word => {
  const { id, name, meaning, translation, examples } = word;
  if (id) {
    db.transaction(tx => {
      tx.executeSql(
        "update words set name=?, meaning=?, translation=?, examples=? where id=?",
        [name, meaning, translation, examples, id],
        (tx, results) => {
          if (results) {
            alert("Word has been updated");
            Actions.wordId({ word });
          }
        }
      );
    });
  } else {
    db.transaction(tx => {
      tx.executeSql(
        "insert into words ( name, meaning, translation, examples ) values ( ?, ?, ?, ? )",
        [name, meaning, translation, examples],
        (tx, results) => {
          if (results) {
            const wordsLength = words.length - 1;
            const newId = words[wordsLength].id + 1;
            newWord = {
              id: newId,
              name,
              meaning,
              translation,
              archive: null,
              examples,
              level: null
            };
            words.push(newWord);
            // console.log(newWord)
            alert("Word has been saved");
          }
        }
      );
    });
  }

  return {
    type: ADD_WORD,
    words
  };
};

export const deleteWord = id => {
  db.transaction(tx => {
    tx.executeSql(`delete from words WHERE id=?`, [id], (tx, results) => {
      if (results.rowsAffected === 1) {
        alert("The word has been deleted.");
        setTimeout(() => {
          Actions.Words();
        }, 1000);
      } else {
        alert("Somethings went wrong.");
      }
    });
  });
  return {
    type: DELETE_WORD
  };
};
