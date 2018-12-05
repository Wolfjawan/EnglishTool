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

class Sentences extends React.Component {
  state = { hideNavBar: false, hideTabBar: false };

  render() {
    const { sentences } = this.props;
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <ScrollView>
          <Button
            buttonStyle={styles.button}
            textStyle={{ fontSize: 50, color: "white", textAlign: 'center' }}
            text="+"
            onPress={() => {
              Actions.add_new_sentence();
            }}
          />
          {sentences.map((sentence, i) => {
            if (!sentence.archive) {
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
Sentences.propTypes = propTypes;
Sentences.defaultProps = defaultProps;

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
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    marginBottom: 0,
    alignItems: "center",
    padding: 10,
    maxHeight: 50
  }
});

export default Sentences;
