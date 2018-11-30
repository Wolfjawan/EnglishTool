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
  constructor(props) {
    super(props);
    this.state = {
      hideNavBar: false,
      hideTabBar: false,
      name: "",
      meaning: "",
      translation: "",
      examples: "",
      id: null
    };
  }
  componentDidMount() {
    if (this.props.word) {
      const { id, name, meaning, translation, examples } = this.props.word;
      this.setState({ id, name, meaning, translation, examples });
    }
  }
  onChangeText = e => {
    this.setState({
      [e.name]: e.text
    });
  };

  onPress = () => {
    const { id, name, meaning, translation, examples } = this.state;
    const word = {
      id,
      name,
      meaning,
      translation,
      examples
    };
    this.props.addWord(word);
    this.setState({
      name: "",
      meaning: "",
      translation: "",
      examples: "",
      id: null
    });
  };

  render() {
    const { id, name, meaning, translation, examples } = this.state;
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <ScrollView>
          <Input
            header="Word"
            value={name}
            name="name"
            onChangeText={this.onChangeText}
          />
          <Input
            header="Translation"
            value={translation}
            name="translation"
            onChangeText={this.onChangeText}
          />
          <Input
            header="Meaning"
            value={meaning}
            name="meaning"
            onChangeText={this.onChangeText}
          />
          <Input
            header="Examples"
            value={examples}
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


export default AddNewWord
