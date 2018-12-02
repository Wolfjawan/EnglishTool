import { Actions } from "react-native-router-flux";
import {
  GET_WORDS,
  GET_SENTENCES,
  ADD_WORD,
  DELETE_WORD,
  ARCHIVE_WORD
} from "./types";

import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: "Database.db" });

export const getData = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      resolve(
        Promise.all([
          new Promise(resolve => {
            tx.executeSql("select * from words", [], (tx, results) => {
              var words = [];
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
              resolve(words);
            });
          }),
          new Promise(resolve => {
            tx.executeSql("SELECT * FROM sentences", [], (tx, results) => {
              var sentences = [];
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
              resolve(sentences);
            });
          })
        ])
      );
    });
  });
};

export const loadData = () => {
  return dispatch => {
    getData().then(([words, sentences]) => {
      dispatch(getWords(words));
      dispatch(getSentences(sentences));
    });
  };
};

export const getWords = words => {
  return {
    type: GET_WORDS,
    words
  };
};

export const getSentences = sentences => {
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
            alert("Word has been saved");
          }
        }
      );
    });
  }
  return {
    type: ADD_WORD,
    word
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
    type: DELETE_WORD,
    id
  };
};

export const archiveWord = word => {
  const { id, archive } = word;
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE words SET archive=? WHERE id=?`,
      [archive ? false : true, id],
      (tx, results) => {
        if (results.rowsAffected === 1) {
          loadData();
          archive
            ? (alert("The word removed from Archives."),
              setTimeout(() => {
                Actions.Archive();
              }, 1000))
            : (alert("The word stored in Archives."),
              setTimeout(() => {
                Actions.Words();
              }, 1000));
        } else {
          alert("Something went wrong.");
        }
      }
    );
  });
  return {
    type: ARCHIVE_WORD,
    word
  };
};
