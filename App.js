import React, { Component } from "react";
import Router from "./src/Routs/index";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./src/Reducer";
import { loadData } from "./src/action";

const store = createStore(reducers, applyMiddleware(ReduxThunk));
export default class App extends Component {
componentWillMount(){
  store.dispatch(loadData())
}
  render() {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}
//react-native log-android
//react-devtools
