import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { StackViewStyleInterpolator } from "react-navigation-stack";
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox
} from "react-native-router-flux";
//documentations https://github.com/aksonov/react-native-router-flux/blob/master/docs/API.md#tabs-tabs-or-scene-tabs

import DrawerContent from "../components/drawer/DrawerContent";
import TabIcon from "../components/TabIcon";
import MenuIcon from "../images/menu_burger.png";
import HomeScreen from "../screens/home";
import Words from "../screens/Words";
import AddNewWordOrSentences from "../screens/AddNewWordOrSentences";
import AddNewWord from "../components/Forms/AddNewWord";
import AddNewSentence from "../components/Forms/AddNewSentence";
import Sentences from "../screens/Sentences";
import Archive from "../screens/Archive";
import Settings from "../screens/Settings";
import Word from "../components/word";
import Sentence from "../components/sentence";
import DrawerIcon from "../components/drawer/drawerIcon";

const stateHandler = (prevState, newState, action) => {
  // console.log("onStateChange: ACTION:",);
};

const getSceneStyle = () => ({
  backgroundColor:'#CAD8DE',
  shadowOpacity: 1,
  shadowRadius: 3
});

const prefix = Platform.OS === "android" ? "mychat://mychat/" : "mychat://";

const Routs = ({ db, words, sentences, getData }) => (
  <Router
    onStateChange={stateHandler}
    getSceneStyle={getSceneStyle}
    uriPrefix={prefix}
    db={db}
    words={words}
    sentences={sentences}
    getData={getData}
  >
    <Overlay key="overlay">
      {/* <Modal key="modal" hideNavBar> */}
      <Stack key="root" titleStyle={{ alignSelf: "center" }}>
        {/* <Scene hideNavBar panHandlers={null} styles={styles.tabsScene}> */}
        <Drawer
          hideNavBar
          key="drawer"
          // onExit={() => alert("Drawer closed")}
          // onEnter={() => alert("Drawer opened")}
          contentComponent={DrawerContent}
          drawerImage={MenuIcon}
          drawerWidth={300}
          drawerPosition="right"
          // drawerIcon={DrawerIcon}
        >
          <Tabs
            // tabBarPosition="bottom"
            key="tabbar"
            routeName="tabbar"
            backToInitial
            swipeEnabled
            showLabel={false}
            activeBackgroundColor="white"
            inactiveBackgroundColor=""
            hideNavBar
            lazy={false}
          >
            <Stack key="Words" title="Words" icon={TabIcon}>
              <Scene
                onPress={() => Actions.home_screen()}
                title="Home"
                titleStyle={{ alignItems: "center", textAlign: "center" }}
                component={Words}
              />
            </Stack>
            <Stack
              key="Sentences"
              icon={TabIcon}
              title="Sentences"
              component={Sentences}
            />
            <Stack
              key="AddNewWordOrSentences"
              title="Forms"
              icon={TabIcon}
              component={AddNewWordOrSentences}
            />
            <Stack
              key="Archive"
              icon={TabIcon}
              title="Archive"
              component={Archive}
            />
          </Tabs>
        </Drawer>
        {/* </Scene> */}
        <Scene key="add_new_word" component={AddNewWord} title="Add new word" />
        <Scene
          key="add_new_sentence"
          component={AddNewSentence}
          title="Add new Sentence"
        />
        <Scene key="wordId" component={Word} title="Word" />
        <Scene key="sentenceId" component={Sentence} title="Sentence" />
        <Scene key="settings" component={Settings} title="Settings" />
        <Scene
          title="Home"
          key="home_screen"
          component={HomeScreen}
          tabBarLabel="Home"
          icon={TabIcon}
          // initial
        />
      </Stack>
      {/* </Modal> */}
    </Overlay>
  </Router>
);
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabsScene: {
    bottom: 0
  }
});
export default Routs;
