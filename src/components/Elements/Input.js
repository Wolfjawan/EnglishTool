import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

class Input extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.header}</Text>
        <TextInput
          multiline={true}
          style={styles.input}
          value={this.props.value}
          onChangeText={text => this.props.onChangeText({ text, name })}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    height: 70,
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },
  header: {
    fontSize: 20
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5
  }
});
export default Input;
