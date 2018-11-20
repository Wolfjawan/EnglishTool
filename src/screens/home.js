import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  Image,
  ScrollView,
  TextInput
} from "react-native";
import Button from "react-native-button";
import { Actions } from "react-native-router-flux";
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes
} from "react-native-google-signin";
// import firebase from "firebase";
import firebase from "react-native-firebase";
const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string.isRequired
};

const defaultProps = {
  sceneStyle: null
};

GoogleSignin.configure();
class NomeScreen extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("todos");
    this.state = {
      hideNavBar: false,
      hideTabBar: false,
      userInfo: {},
      textInput: ""
    };
  }
  updateTextInput(value) {
    this.setState({ textInput: value });
  }
  addTodo=()=> {
  this.ref.add({
    title: this.state.textInput,
    complete: false,
  });
}
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("errrr 1");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("errrr 2");
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("errrr 3");
      } else {
        // some other error happened
        console.log("errrr 4", error);
      }
    }
  };

  render() {
    const { userInfo } = this.state;
    console.log("here", userInfo);
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        {userInfo.user && (
          <View>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: userInfo.user.photo }}
            />
            <Text>{userInfo.user.givenName}</Text>
            <Text>{userInfo.user.familyName}</Text>
            <Text>{userInfo.user.email}</Text>
            <Text>{userInfo.user.name}</Text>
          </View>
        )}
        {/* {!userInfo.user && (
          <GoogleSigninButton
            style={{ width: 70, height: 78 }}
            size={GoogleSigninButton.Size.Icon}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.signIn}
            disabled={this.state.isSigninInProgress}
          />
        )} */}
        <View>
          <ScrollView>
            <Text>List of TODOs</Text>
          </ScrollView>
          <TextInput
            placeholder={"Add TODO"}
            value={this.state.textInput}
            onChangeText={text => this.updateTextInput(text)}
          />
          <Button
            title={"Add TODO"}
            disabled={!this.state.textInput.length}
            onPress={() => this.addTodo()}
          >Add TODO</Button>
        </View>
      </View>
    );
  }
}
NomeScreen.propTypes = propTypes;
NomeScreen.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});
export default NomeScreen;
//'here', { scopes:
//   [ 'https://www.googleapis.com/auth/userinfo.profile',
//     'https://www.googleapis.com/auth/plus.me',
//     'https://www.googleapis.com/auth/userinfo.email' ],
//  accessTokenExpirationDate: null,
//  serverAuthCode: null,
//  idToken: null,
//  accessToken: 'ya29.GltYBoJZ8Qm5gdpKje9B46J56Qu4RhXh55hXLHb6259RVQqR7bQDhqzwZorQIkhL7mYDi6-odzc3soKbThUFQt2aMqIPF4Bmns6zPayfbhTyPQ51E_B77K2uGJAL',
//  user:
//   { photo: 'https://lh4.googleusercontent.com/-ftSkGOGurow/AAAAAAAAAAI/AAAAAAAAAHs/AmPsJ1bMvgM/photo.jpg',
//     email: 'mohsen000069@gmail.com',
//     givenName: 'Mohsen',
//     familyName: 'Moradi',
//     name: 'Mohsen Moradi',
//     id: '117017369556829078538' } }
