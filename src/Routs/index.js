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

const stateHandler = (prevState, newState, action) => {
  // console.log("onStateChange: ACTION:",);
};

const getSceneStyle = () => ({
  backgroundColor: "#F5FCFF",
  shadowOpacity: 1,
  shadowRadius: 3
});

const prefix = Platform.OS === "android" ? "mychat://mychat/" : "mychat://";

const Routs = (db) => (
  <Router
    onStateChange={stateHandler}
    getSceneStyle={getSceneStyle}
    uriPrefix={prefix}
    db={db}
  >
    <Modal key="modal" hideNavBar>
      <Stack key="root" titleStyle={{ alignSelf: "center" }}>
        <Drawer
          hideNavBar
          key="drawer"
          // onExit={() => alert("Drawer closed")}
          // onEnter={() => alert("Drawer opened")}
          contentComponent={DrawerContent}
          drawerImage={MenuIcon}
          drawerWidth={200}
        >
          <Scene hideNavBar panHandlers={null} styles={styles.tabsScene}>
            <Tabs
              tabBarPosition="bottom"
              key="tabbar"
              routeName="tabbar"
              backToInitial
              swipeEnabled
              showLabel={false}
              activeBackgroundColor="white"
              inactiveBackgroundColor="gray"
              hideNavBar
              lazy={false}
            >
              <Stack
                key="home_screen"
                title="Home"
                tabBarLabel="Home"
                icon={TabIcon}
                initial
              >
                <Scene key="home_screen" component={HomeScreen} title="Home" />
              </Stack>
              <Stack
                key="Words"
                title="Words"
                tabBarLabel="Words"
                icon={TabIcon}
              >
                <Scene key="Words" component={Words} title="Words" />
              </Stack>
              <Stack key="Sentences" icon={TabIcon} title="Sentences">
                <Scene key="Sentences" component={Sentences} />
              </Stack>
              <Stack key="AddNewWordOrSentences" title="Forms" icon={TabIcon}>
                <Scene
                  key="AddNewWordOrSentences"
                  component={AddNewWordOrSentences}
                  title="Forms"
                />
                <Scene
                  key="add_new_word"
                  component={AddNewWord}
                  title="Add new word"
                />
                <Scene
                  key="add_new_sentence"
                  component={AddNewSentence}
                  title="Add new Sentence"
                />
              </Stack>
              <Stack key="Archive" icon={TabIcon} title="Archive">
                <Scene key="Archive" component={Archive} title="Archive" />
              </Stack>
            </Tabs>
          </Scene>
        </Drawer>
        <Scene key="settings" component={Settings} title="Settings" />
      </Stack>
    </Modal>
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
