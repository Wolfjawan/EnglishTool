export default (createTable = db => {
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
});
