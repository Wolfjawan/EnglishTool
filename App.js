import React, {Component} from 'react';
import Routs from './src/Routs/index'
import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: "Database.db"});
type Props = {};
export default class App extends Component<Props> {
  componentDidMount(){
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM words', [], (tx, results) => {
          console.log("Query completed",results);
          // Get rows with Web SQL Database spec compliance.
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            console.log(`Record: ${row.name}`);
          }
        });
    });
  }
  render() {
    return <Routs db={db}/>
  }
}
//react-native log-android
//react-devtools
