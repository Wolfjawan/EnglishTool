import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  ScrollView
} from "react-native";
import Input from "../Elements/Input";
import Button from "../Elements/Button";
import { Actions } from "react-native-router-flux";

const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string.isRequired
};

const defaultProps = {
  sceneStyle: null
};

class AddNewWord extends React.Component {
  state = {
    hideNavBar: false,
    hideTabBar: false,
    name: "",
    meaning: "",
    translation: "",
    examples: ""
  };

  onChangeText = e => {
    this.setState({
      [e.name]: e.text
    });
  };

  onPress = () => {
    var { db } = this.props
    const { name, meaning, translation, examples } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        "insert into words ( name, meaning, translation, examples ) values ( ?, ?, ?, ? )",
        [name, meaning, translation, examples],
        (tx, results) => {
          if (results) {
            this.setState({
              name: "",
              meaning: "",
              translation: "",
              examples: ""
            });
            this.props.getData()
          }
        }
      );
    });
  };

  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <ScrollView>
          <Input
            header="Word"
            value={this.state.name}
            name="name"
            onChangeText={this.onChangeText}
          />
          <Input
            header="Translation"
            value={this.state.translation}
            name="translation"
            onChangeText={this.onChangeText}
          />
          <Input
            header="Meaning"
            value={this.state.meaning}
            name="meaning"
            onChangeText={this.onChangeText}
          />
          <Input
            header="Examples"
            value={this.state.examples}
            name="examples"
            onChangeText={this.onChangeText}
          />
          <Button
            buttonStyle={styles.button}
            text="Save"
            onPress={this.onPress}
          />
        </ScrollView>
      </View>
    );
  }
}
AddNewWord.propTypes = propTypes;
AddNewWord.defaultProps = defaultProps;

var styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff"
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  },
  button: {
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    padding: 10
  }
});
export default AddNewWord;
