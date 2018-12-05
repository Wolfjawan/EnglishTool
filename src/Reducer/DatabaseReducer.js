import {
  GET_WORDS,
  GET_SENTENCES,
  ADD_WORD,
  DELETE_WORD,
  ARCHIVE_WORD,
  ADD_SENTENCES,
  DELETE_SENTENCES,
  ARCHIVE_SENTENCES
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
      if (action.word.id) {
        const { id, name, meaning, translation, examples } = action.word;
        const newWords = state.words.filter(word => word.id !== id);
        newWord = {
          id,
          name,
          meaning,
          translation,
          archive: null,
          examples,
          level: null
        };
        return { ...state, words: [...newWords, newWord] };
      } else {
        const { name, meaning, translation, examples } = action.word;
        const wordsLength = state.words.length - 1;
        const newId = state.words.length > 0 ? state.words[wordsLength].id + 1 : 1
        newWord = {
          id: newId,
          name,
          meaning,
          translation,
          archive: null,
          examples,
          level: null
        };
        return { ...state, words: [...state.words, newWord] };
      }
    case DELETE_WORD:
      const newWords = state.words.filter(word => word.id !== action.id);
      return { ...state, words: newWords };
    case ARCHIVE_WORD:
      if (action.word.id) {
        const {
          id,
          name,
          meaning,
          translation,
          examples,
          archive
        } = action.word;
        const words = state.words.filter(word => word.id !== id);
        archivedWord = {
          id,
          name,
          meaning,
          translation,
          archive: archive ? false : true,
          examples,
          level: null
        };
        return { ...state, words: [...words, archivedWord] };
      }
    case ADD_SENTENCES:
      if (action.sentence.id) {
        const { id, name, meaning, translation } = action.sentence;
        const newSentences = state.sentences.filter(sentence => sentence.id !== id);
        newSen = {
          id,
          name,
          meaning,
          translation,
          archive: null,
          level: null
        };
        return { ...state, sentences: [...newSentences, newSen] };
      } else {
        const { name, meaning, translation } = action.sentence;
        const sentencesLength = state.sentences.length - 1;
        const sentenceId = state.sentences.length > 0 ? state.sentences[sentencesLength].id + 1 : 1
        newSent = {
          id: sentenceId,
          name,
          meaning,
          translation,
          archive: null,
          level: null
        };
        return { ...state, sentences: [...state.sentences, newSent] };
      }
    case DELETE_SENTENCES:
      const newSentence = state.sentences.filter(sentence => sentence.id !== action.id);
      return { ...state, sentences: newSentence };
      case ARCHIVE_SENTENCES:
      if (action.sentence.id) {
        const {
          id,
          name,
          meaning,
          translation,
          archive
        } = action.sentence;
        const sentences = state.sentences.filter(sentence => sentence.id !== id);
        archivedSentence = {
          id,
          name,
          meaning,
          translation,
          archive: archive ? false : true,
          level: null
        };
        return { ...state, sentences: [...sentences, archivedSentence] };
      }
    default:
      return state;
  }
};
