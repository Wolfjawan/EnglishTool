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
import HomeIcon from "../images/icon-home.png";
import HomeScreen from "../screens/home";
import Words from "../screens/Words";
import AddNewWord from "../components/Forms/AddNewWord";
import AddNewSentence from "../components/Forms/AddNewSentence";
import Sentences from "../screens/Sentences";
import Archive from "../screens/Archive";
import Settings from "../screens/Settings";
import Word from "../components/word";
import Sentence from "../components/sentence";
import DrawerIcon from "../components/drawer/drawerIcon";
import Painting from "../screens/Painting";
const stateHandler = (prevState, newState, action) => {
  // console.log("onStateChange: ACTION:",newState);
};

const getSceneStyle = () => ({
  backgroundColor: "#CAD8DE",
});

const prefix = Platform.OS === "android" ? "mychat://mychat/" : "mychat://";

const Routs = ({
  getWords,
  getSentences,
  words,
  sentences,
  addWord,
  deleteWord,
  archiveWord,
  addSentence,
  deleteSentence,
  archiveSentence
}) => (
    <Router
      onStateChange={stateHandler}
      getSceneStyle={getSceneStyle}
      uriPrefix={prefix}
      getSentences={getSentences}
      getWords={getWords}
      words={words}
      sentences={sentences}
      addWord={addWord}
      deleteWord={deleteWord}
      archiveWord={archiveWord}
      addSentence={addSentence}
      deleteSentence={deleteSentence}
      archiveSentence={archiveSentence}
    >
      <Stack key="root" >
        <Drawer
          hideNavBar
          key="drawer"
          // onExit={() => alert("Drawer closed")}
          // onEnter={() => alert("Drawer opened")}
          contentComponent={DrawerContent}
          drawerImage={MenuIcon}
          drawerWidth={300}
          drawerPosition="right"
          onLeft={() => Actions.home_screen()}
          leftButtonImage={HomeIcon}
        >
          <Scene title="Home" key="home_screen" component={HomeScreen} />
          <Tabs
            key="tab-bar"
            routeName="tab-bar"
            backToInitial
            swipeEnabled
            showLabel={false}
            activeBackgroundColor="white"
            inactiveBackgroundColor=""
            lazy={false}
          >
            <Stack key="Words" title="Words" icon={TabIcon} component={Words} />
            <Stack
              key="Sentences"
              icon={TabIcon}
              title="Sentences"
              component={Sentences}
            />
            <Stack
              key="Archive"
              icon={TabIcon}
              title="Archive"
              component={Archive}
            />
          </Tabs>
        </Drawer>
        <Scene key="add_new_word" component={AddNewWord} title="Add new word" />
        <Scene
          key="add_new_sentence"
          component={AddNewSentence}
          title="Add new Sentence"
        />
        <Scene key="wordId" component={Word} title="Word" />
        <Scene key="sentenceId" component={Sentence} title="Sentence" />
        <Scene key="settings" component={Settings} title="Settings" />
        <Scene key="painting" component={Painting} title="Paint bord" />
      </Stack>
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
