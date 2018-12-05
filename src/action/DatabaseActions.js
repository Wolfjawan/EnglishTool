import { Actions } from "react-native-router-flux";
import {
  GET_WORDS,
  GET_SENTENCES,
  ADD_WORD,
  DELETE_WORD,
  ARCHIVE_WORD,
  ADD_SENTENCES,
  DELETE_SENTENCES,
  ARCHIVE_SENTENCES
} from "./types";

import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: "Database.db" });
export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS words
      (
          id INTEGER primary key,
          name text ,
          meaning text,
          translation text,
          archive INTEGER,
          examples text,
          level INTEGER
      )`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS sentences
      (
          id INTEGER primary key,
          name text ,
          meaning text,
          translation text,
          archive INTEGER,
          level INTEGER
      )`
    );
  });
}
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
            alert("Word has been saved");
            Actions.add_new_word()
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

export const addSentence = sentence => {
  const { id, name, meaning, translation } = sentence
  if (id) {
    db.transaction(tx => {
      tx.executeSql(
        "update sentences set name=?, meaning=?, translation=? where id=?",
        [name, meaning, translation, id],
        (tx, results) => {
          if (results) {
            alert("Sentence has been updated");
            Actions.sentenceId({ sentence });
          }
        }
      );
    });
  } else {
    db.transaction(tx => {
      tx.executeSql(
        "insert into sentences ( name, meaning, translation ) values ( ?, ?, ? )",
        [name, meaning, translation],
        (tx, results) => {
          alert("Sentence has been saved");
          Actions.add_new_sentence();
        }
      );
    });
  }
  return {
    type: ADD_SENTENCES,
    sentence
  };
}

export const deleteSentence = id => {
  db.transaction(tx => {
    tx.executeSql(`delete from sentences WHERE id=?`, [id], (tx, results) => {
      if (results.rowsAffected === 1) {
        alert("The sentence has been deleted.");
        setTimeout(() => {
          Actions.Sentences();
        }, 1000);
      } else {
        alert("Somethings went wrong.");
      }
    });
  });
  return {
    type: DELETE_SENTENCES,
    id
  };
};

export const archiveSentence = sentence => {
  const { id, archive } = sentence;
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE sentences SET archive=? WHERE id=?`,
      [archive ? false : true, id],
      (tx, results) => {
        if (results.rowsAffected === 1) {
          loadData();
          archive
            ? (alert("The sentence removed from Archives."),
              setTimeout(() => {
                Actions.Archive();
              }, 1000))
            : (alert("The sentence stored in Archives."),
              setTimeout(() => {
                Actions.Sentences();
              }, 1000));
        } else {
          alert("Something went wrong.");
        }
      }
    );
  });
  return {
    type: ARCHIVE_SENTENCES,
    sentence
  };
};