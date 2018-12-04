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

class AddNewSentence extends React.Component {
  state = {
    hideNavBar: false,
    hideTabBar: false,
    name: "",
    meaning: "",
    translation: "",
    id:null
  };
  onChangeText = e => {
    this.setState({
      [e.name]: e.text
    });
  };
    componentDidMount() {
    if (this.props.sentence) {
      const { id, name, meaning, translation } = this.props.sentence;
      this.setState({ id, name, meaning, translation});
    }
  }
  onPress = () => {
    const {id, name, meaning, translation } = this.state;
    const sentence = {
      id,
      name,
      meaning,
      translation
    };
    this.props.addSentence(sentence);
    this.setState({
      name: "",
      meaning: "",
      translation: "",
      id: null
    });
  };

  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <ScrollView>
          <Input
            header="Sentence"
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
AddNewSentence.propTypes = propTypes;
AddNewSentence.defaultProps = defaultProps;

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
    alignSelf: "center",
    alignItems: "center",
    padding: 10
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
export default AddNewSentence;
