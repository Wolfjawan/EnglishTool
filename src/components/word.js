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

class Word extends React.Component {
  state = {
    hideNavBar: false,
    hideTabBar: false,
    ShowTranslation: false,
    isDelete: false
  };

  delete = () => {
    const { id } = this.props.word;
    this.props.deleteWord(id);
  };
  render() {
    const { name, meaning, translation, examples, archive } = this.props.word;
    const { ShowTranslation, isDelete } = this.state;
    const { word } = this.props;
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        {isDelete && (
          <View
            style={{
              borderWidth: 1,
              paddingTop: 10,
              margin: 10,
              borderRadius: 5,
              minHeight: 120,
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 20 }}>
              Are you sure you want to delete?
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginTop: 40,
                maxHeight: 40
              }}
            >
              <Button
                text="Cancel"
                onPress={() => {
                  this.setState({ isDelete: false });
                }}
                textStyle={{ fontSize: 18 }}
                buttonStyle={styles.Edit}
              />
              <Button
                text="Delete"
                onPress={this.delete}
                textStyle={{ fontSize: 18 }}
                buttonStyle={styles.Delete}
              />
            </View>
          </View>
        )}
        <ScrollView>
          <View style={styles.word}>
            {ShowTranslation ? (
              <Button
                text={translation}
                onPress={() => {
                  this.setState({ ShowTranslation: false });
                }}
                textStyle={styles.name}
                buttonStyle={styles.button}
              />
            ) : (
              <Button
                text={name}
                onPress={() => {
                  this.setState({ ShowTranslation: true });
                }}
                textStyle={styles.name}
                buttonStyle={styles.button}
              />
            )}
            <View>
              <Text>Meaning: </Text>
              <Text style={styles.meaning}>{meaning}</Text>
            </View>
            <View>
              <Text>Examples: </Text>
              <Text style={styles.examples}>{examples}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={{ flex: 1, flexDirection: "row", maxHeight: 40 }}>
          <Button
            text="Edit"
            onPress={() => Actions.add_new_word({ word })}
            textStyle={{ fontSize: 18 }}
            buttonStyle={styles.Edit}
          />
          <Button
            text={archive ? "Unarchive" : "Archive"}
            onPress={() => this.props.archiveWord(word)}
            textStyle={{ fontSize: 18 }}
            buttonStyle={styles.Archive}
          />
          <Button
            text="Delete"
            onPress={() => {
              this.setState({ isDelete: true });
            }}
            textStyle={{ fontSize: 18 }}
            buttonStyle={styles.Delete}
          />
        </View>
      </View>
    );
  }
}
Word.propTypes = propTypes;
Word.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  word: {
    padding: 10,
    margin: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center"
  },
  name: {
    fontSize: 54,
    color: "#503204"
  },
  button: {
    alignItems: "center",
    padding: 10
  },
  Edit: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#008DD5",
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 4
  },
  Delete: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#EA2B1F",
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 4
  },
  Archive: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#6CC551",
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 4
  },
  meaning: {
    fontSize: 20,
    color: "#503204",
    borderBottomWidth: 1,
    borderBottomColor: "#A2A2A2",
    marginBottom: 10,
    padding: 4
  },
  translation: {
    fontSize: 20,
    color: "#503204",
    borderBottomWidth: 1,
    borderBottomColor: "#A2A2A2",
    marginBottom: 10,
    padding: 4
  },
  examples: {
    fontSize: 20,
    color: "#503204",
    padding: 4
  }
});
export default Word;
