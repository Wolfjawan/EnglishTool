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

class Archives extends React.Component {
  state = { hideNavBar: false, hideTabBar: false, showWords: false, showSentences: false };

  render() {
    const { words, sentences } = this.props;
    const { showWords, showSentences } = this.state
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <ScrollView>
          <Button
            text='Words'
            buttonStyle={styles.button}
            textStyle={styles.text}
            onPress={() => this.setState({ showWords: showWords ? false : true })}
          />
          {showWords && words.map((word, i) => {
            if (word.archive) {
              return (
                <Button
                  key={i}
                  text={word.name}
                  buttonStyle={styles.button}
                  textStyle={styles.text}
                  onPress={() => Actions.wordId({ word })}
                />
              );
            }
          })}
          <Button
            text='Sentences'
            buttonStyle={styles.button}
            textStyle={styles.text}
            onPress={() => this.setState({ showSentences: showSentences ? false : true })}
          />
          {showSentences && sentences.map((sentence, i) => {
            if (sentence.archive) {
              return (
                <Button
                  key={i}
                  text={sentence.name}
                  buttonStyle={styles.button}
                  textStyle={styles.text}
                  onPress={() => Actions.sentenceId({ sentence })}
                />
              );
            }
          })}
        </ScrollView>
      </View>
    );
  }
}
Archives.propTypes = propTypes;
Archives.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
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

export default Archives;
