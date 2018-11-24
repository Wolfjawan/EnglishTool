import React, {Component} from 'react';
import Routs from './src/Routs/index'
import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: "Database.db"});
type Props = {};
export default class App extends Component<Props> {
  render() {
    return <Routs db={db}/>
  }
}
//react-native log-android
//react-devtools
