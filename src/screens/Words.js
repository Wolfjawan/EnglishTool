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

class Words extends React.Component {
  state = { hideNavBar: false, hideTabBar: false, words: [] };
  componentDidMount() {
    var { db } = this.props.db;
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM words", [], (tx, results) => {
        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          newWords = {
            id: row.id,
            name: row.name,
            meaning: row.meaning,
            translation: row.translation,
            archive: row.archive,
            examples: row.examples,
            level: row.level
          };
          this.setState({
            words: [...this.state.words, newWords]
          });
        }
      });
    });
  }
  render() {
    const { words } = this.state;
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <ScrollView>
          {words.map((word, i) => {
            return (
              <Button
                key={i}
                text={word.name}
                buttonStyle={styles.button}
                onPress={() => Actions.wordId({ word })}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
Words.propTypes = propTypes;
Words.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: 20
  },
  words: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5
  },
  button: {
    backgroundColor: "#fff",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    marginBottom: 0
  }
});
export default Words;
