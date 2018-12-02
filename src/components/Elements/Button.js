import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from "react-native";

class MYButton extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.buttonStyle]}>
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Text style={this.props.textStyle}> {this.props.text} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default MYButton;
