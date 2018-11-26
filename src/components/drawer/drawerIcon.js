import React from "react";
import { Icon } from "react-native-elements";

export default class MenuIcon extends React.Component {
  render() {
    return (
      <Icon
        name="g-translate"
        color="#00aced"
        onPress={() => console.log("hello")}
      />
    );
  }
}
