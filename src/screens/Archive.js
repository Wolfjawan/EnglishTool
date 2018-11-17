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



class Archive extends React.Component {
  state = { hideNavBar: false, hideTabBar: false };

  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <Text>Show Archive here</Text>
      </View>
    );
  }
}
Archive.propTypes = propTypes;
Archive.defaultProps = defaultProps;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent"
    }
  });
export default Archive;
