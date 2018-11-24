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

class Words extends React.Component {
  state = { hideNavBar: false, hideTabBar: false, words: [] };
  componentDidMount() {
    var { db } = this.props.db;
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM words", [], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          console.log(`Record: ${row.name}`);
          this.setState({ words: row });
        }
      });
    });
  }
  render() {
    console.log(this.state.words);
    const { words } = this.state;
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <Text>Show words here</Text>
        <View>
          {words.map((word) => {
            return (
              <View>
                <Text>{word.name}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
Words.propTypes = propTypes;
Words.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});
export default Words;
