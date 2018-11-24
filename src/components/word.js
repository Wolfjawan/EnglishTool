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
              />
            ) : (
              <Button
                text={name}
                onPress={() => {
                  this.setState({ ShowTranslation: true });
                }}
                textStyle={styles.name}
              />
            )}
            <View style={styles.meaning}>
              <Text>Meaning: </Text>
              <Text>{meaning}</Text>
            </View>
            <View style={styles.examples}>
              <Text>Examples: </Text>
              <Text>{examples}</Text>
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
    color: "#503204",
  },
  meaning: {
    fontSize: 24,
    color: "#503204",
    borderBottomWidth: 1,
    borderBottomColor: "#A2A2A2",
    marginBottom: 10,
    padding: 4
  },
  translation: {
    fontSize: 24,
    color: "#503204",
    borderBottomWidth: 1,
    borderBottomColor: "#A2A2A2",
    marginBottom: 10,
    padding: 4
  },
  examples: {
    fontSize: 24,
    color: "#503204",
    padding: 4
  }
});
export default Word;
