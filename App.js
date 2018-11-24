import React, { Component } from "react";
import Routs from "./src/Routs/index";
import { openDatabase } from "react-native-sqlite-storage";
import CreateTables from "./src/database/createTables";

var db = openDatabase({ name: "Database.db" });

export default class App extends Component {
  state = { sentences: [], words: [] };
  componentDidMount() {
    CreateTables(db);
    this.getData()
  }
  getData = () => {
    this.setState({
      sentences: [],
      words: []
    });
    this.getWords();
    this.getSentences();
  };
  getSentences = () => {
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM sentences", [], (tx, results) => {
        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          newSentences = {
            id: row.id,
            name: row.name,
            meaning: row.meaning,
            translation: row.translation,
            archive: row.archive,
            level: row.level
          };
          this.setState({
            sentences: [...this.state.sentences, newSentences]
          });
        }
      });
    });
  };
  getWords = () => {
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
          this.setState({
            words: [...this.state.words, newWord]
          });
        }
      });
    });
  };
  render() {
    const { words, sentences } = this.state;
    return (
      <Routs
        db={db}
        words={words}
        sentences={sentences}
        getData={this.getData}
      />
    );
  }
}
//react-native log-android
//react-devtools
