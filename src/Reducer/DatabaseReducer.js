import {
  GET_WORDS,
  GET_SENTENCES,
  ADD_WORD,
  DELETE_WORD
} from "../action/types";

const INITIAL_STATE = {
  words: [],
  sentences: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_WORDS:
      return { ...state, words: action.words };
    case GET_SENTENCES:
      return { ...state, sentences: action.sentences };
    case ADD_WORD:
      return { ...state, words: action.words };
    case DELETE_WORD:
      return { ...state, words: action.words };
    default:
      return state;
  }
};
// return { ...state, words: action.words, sentences: action.sentences  };
// case GET_SENTENCES:
  // return { ...state, words: action.words, sentences: action.sentences };