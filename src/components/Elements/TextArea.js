import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

class TextArea extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.header}</Text>
        <TextInput
          editable = {true}
          style={styles.TextArea}
          multiline={true}
          numberOfLines={4}
          onChangeText={text => this.props.onChangeText({ text, name })}
          value={this.props.value}
          maxLength = {40}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    height: 110,
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },
  header: {
    fontSize: 20
  },
  TextArea: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding:0
  }
});
export default TextArea;
