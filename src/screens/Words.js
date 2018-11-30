import React from "react";
import PropTypes from "prop-types";

import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  ScrollView
} from "react-native";
import { Actions } from "react-native-router-flux";
import Button from "../components/Elements/Button";

const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string.isRequired
};

const defaultProps = {
  sceneStyle: null
};

class Words extends React.Component {
  state = { hideNavBar: false, hideTabBar: false };
  componentWillMount() {

    this.props.getWords();
  }
  render() {
    const { words } = this.props;
  
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <ScrollView>
          {words.map((word, i) => {
            return (
              <Button
                key={i}
                text={word.name}
                buttonStyle={styles.button}
                textStyle={styles.text}
                onPress={() => Actions.wordId({ word })}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
Words.propTypes = propTypes;
Words.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: 20,
    backgroundColor: "#CAD8DE"
  },
  text: {
    color: "white",
    fontSize: 24
  },
  button: {
    backgroundColor: "#384E77",
    borderRadius: 5,
    margin: 10,
    marginBottom: 0,
    padding: 10
  }
});

export default Words;
