import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import Button from "../components/Elements/Button";
import { Actions } from "react-native-router-flux";
// import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";
const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string.isRequired
};

const defaultProps = {
  sceneStyle: null
};

class NomeScreen extends React.Component {
  state = { hideNavBar: false, hideTabBar: false };

  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <Button
          text="Words"
          buttonStyle={styles.button}
          textStyle={styles.text}
          onPress={() => Actions.Words()}
        />
        <Button
          text="Sentences"
          buttonStyle={styles.button}
          textStyle={styles.text}
          onPress={() => Actions.Sentences()}
        />
        {/* <GoogleSigninButton
          style={{ width: 48, height: 48 }}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn}
          disabled={this.state.isSigninInProgress}
        /> */}
      </View>
    );
  }
}
NomeScreen.propTypes = propTypes;
NomeScreen.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: 20,
    backgroundColor: "#CAD8DE"
  },
  button: {
    backgroundColor: "#384E77",
    borderRadius: 15,
    margin: 50,
    maxHeight: 100,
    alignItems: "center",
    padding: 10
  },
  text: {
    fontSize: 30,
    color: "white",
  }
});
export default NomeScreen;
