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
  state = { hideNavBar: false, hideTabBar: false, ShowTranslation: false, isDelete:false };
  delete = () => {
    const { id } = this.props.sentence;
    this.props.deleteSentence(id);
  };
  render() {
    const { sentence } = this.props;
    const { name, meaning, translation, archive } = sentence;
    const { ShowTranslation, isDelete } = this.state;
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
            <View style={{ marginBottom: 10, padding: 4 }}>
              <Text>Meaning: </Text>
              <Text style={styles.meaning}>{meaning}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={{ flex: 1, flexDirection: "row", maxHeight: 40 }}>
          <Button
            text="Edit"
            onPress={() => Actions.add_new_sentence({ sentence })}
            textStyle={{ fontSize: 18 }}
            buttonStyle={styles.Edit}
          />
          <Button
            text={archive ? "Unarchive" : "Archive"}
            onPress={() => this.props.archiveSentence(sentence)}
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
Sentence.propTypes = propTypes;
Sentence.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 10
  },
  name: {
    fontSize: 20,
    color: "#503204",
    marginTop: 10,
    marginBottom: 10,
    padding: 4
  },
  meaning: {
    fontSize: 20,
    color: "#503204"
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
  }
});
export default Sentence;
