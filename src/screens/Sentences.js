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
  state = { hideNavBar: false, hideTabBar: false, sentences: [] };

  render() {
    const { sentences } = this.props;
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <ScrollView>
          {sentences.map((sentence, i) => {
            return (
              <Button
                key={i}
                text={sentence.name}
                buttonStyle={styles.button}
                textStyle={styles.text}
                onPress={() => Actions.sentenceId({ sentence })}
              />
            );
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
    marginTop: 20
  },
  text: {
    borderColor: "gray",
    fontSize:20
  },
  button: {
    backgroundColor: "#fff",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    marginBottom: 0,
    alignItems: "center",
    padding: 10
  }
});
export default Sentences;

