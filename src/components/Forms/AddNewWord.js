import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  TouchableHighlight,
  ScrollView
} from "react-native";
import Button from "react-native-button";
import { Actions } from "react-native-router-flux";

import t from "tcomb-form-native";
var Form = t.form.Form;

var Word = t.struct({
  name: t.String,
  meaning: t.String,
  translation: t.String
  // rememberMe: t.Boolean // a boolean
});

var options = {};

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
  state = { hideNavBar: false, hideTabBar: false };

  onPress = () => {
    var value = this.refs.form.getValue();
    if (value) {
      console.log(value)
    }
  };
  
  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <ScrollView>
          <Form ref="form" type={Word} options={options} />
          <TouchableHighlight
            style={styles.button}
            onPress={this.onPress}
            underlayColor="#99d9f4"
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
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
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});
export default AddNewWord;
