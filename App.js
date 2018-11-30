import React, { Component } from "react";
import Routs from "./src/Routs/index";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// import ReduxThunk from "redux-thunk";
import reducers from "./src/Reducer";
import { getData } from "./src/action";
export default class App extends Component {
componentWillMount(){
  getData()
}
  render() {
    const store = createStore(reducers);
    return (
      <Provider store={store}>
        <Routs/>
      </Provider>
    );
  }
}
//react-native log-android
//react-devtools
