import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import Button from "react-native-button";
import { Actions } from "react-native-router-flux";

class DrawerContent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string
  };

  static contextTypes = {
    drawer: PropTypes.object
  };

  render() {
    return (
      <View style={styles.container}>
        <Button>Menu</Button>
        <Button
          onPress={() => {
            Actions.settings();
          }}
        >
          Settings
        </Button>
        <Button onPress={Actions.pop}>Back</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "blue"
  }
});
export default DrawerContent;
