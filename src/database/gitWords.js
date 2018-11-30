exports.getWords = db => {
  var words = [];
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM words", [], (tx, results) => {
      var len = results.rows.length;
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        newWord = {
          id: row.id,
          name: row.name,
          meaning: row.meaning,
          translation: row.translation,
          archive: row.archive,
          examples: row.examples,
          level: row.level
        };
        words.push(newWord);
      }
    });
  });
  return words;
};
