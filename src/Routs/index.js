import React from "react";
import {
  getWords,
  getSentences,
  addWord,
  deleteWord,
  archiveWord
} from "../action";
import { connect } from "react-redux";
import Routs from "./Routs";

const Routers = ({
  getWords,
  getSentences,
  words,
  sentences,
  addWord,
  deleteWord,
  archiveWord
}) => (
  <Routs
    getSentences={getSentences}
    getWords={getWords}
    words={words}
    sentences={sentences}
    addWord={addWord}
    deleteWord={deleteWord}
    archiveWord={archiveWord}
  />
);

export function mapStateToProps(store) {
  const { words, sentences } = store.Database;
  return {
    words,
    sentences
  };
}

export default connect(
  mapStateToProps,
  { getWords, getSentences, addWord, deleteWord, archiveWord }
)(Routers);
