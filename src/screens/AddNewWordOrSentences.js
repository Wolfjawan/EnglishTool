import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import Button from "react-native-button";
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

class AddNewWordOrSentences extends React.Component {
  state = { hideNavBar: false, hideTabBar: false };

  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <Text>Add New Word Or Sentences here</Text>
        <Button
          onPress={() => {
            Actions.add_new_word();
          }}
        >
          Add new word
        </Button>
        <Button
          onPress={() => {
            Actions.add_new_sentence();
          }}
        >
          Add new Sentences
        </Button>
      </View>
    );
  }
}
AddNewWordOrSentences.propTypes = propTypes;
AddNewWordOrSentences.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});
export default AddNewWordOrSentences;
