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

class Sentence extends React.Component {
  state = { hideNavBar: false, hideTabBar: false, ShowTranslation: false };

  render() {
    const { name, meaning, translation } = this.props.sentence;
    const { ShowTranslation } = this.state;
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <ScrollView>
          <View style={styles.Sentence}>
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
            <View style={{marginBottom: 10, padding: 4}}>
              <Text >Meaning: </Text>
              <Text style={styles.meaning}>{meaning}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
Sentence.propTypes = propTypes;
Sentence.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    padding:10
  },
  name: {
    fontSize: 20,
    color: "#503204",
    marginTop:10,
    marginBottom: 10,
    padding: 4
  },
  meaning: {
    fontSize: 20,
    color: "#503204",
  }
});
export default Sentence;
