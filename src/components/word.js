import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  ScrollView
} from "react-native";
import Button from "./Elements/Button";
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

class Word extends React.Component {
  state = { hideNavBar: false, hideTabBar: false, ShowTranslation: false };

  render() {
    const { name, meaning, translation, examples } = this.props.word;
    const { ShowTranslation } = this.state;
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <ScrollView>
          <View style={styles.word}>
            {ShowTranslation ? (
              <Button
                text={translation}
                onPress={() => {
                  this.setState({ ShowTranslation: false });
                }}
                textStyle={styles.name}
                buttonStyle={styles.button}
              />
            ) : (
              <Button
                text={name}
                onPress={() => {
                  this.setState({ ShowTranslation: true });
                }}
                textStyle={styles.name}
                buttonStyle={styles.button}
              />
            )}
            <View >
              <Text>Meaning: </Text>
              <Text style={styles.meaning}>{meaning}</Text>
            </View>
            <View >
              <Text>Examples: </Text>
              <Text style={styles.examples}>{examples}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
Word.propTypes = propTypes;
Word.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  word: {
    padding: 10,
    margin: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center"
  },
  name: {
    fontSize: 54,
    color: "#503204"
  },
  button: {
    alignItems: "center",
    padding: 10
  },
  meaning: {
    fontSize: 20,
    color: "#503204",
    borderBottomWidth: 1,
    borderBottomColor: "#A2A2A2",
    marginBottom: 10,
    padding: 4
  },
  translation: {
    fontSize: 20,
    color: "#503204",
    borderBottomWidth: 1,
    borderBottomColor: "#A2A2A2",
    marginBottom: 10,
    padding: 4
  },
  examples: {
    fontSize: 20,
    color: "#503204",
    padding: 4
  }
});
export default Word;
