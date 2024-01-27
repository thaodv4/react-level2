import {
  QUIZ_MAKER_CHANGE_SUBMIT_STATUS,
  QUIZ_MAKER_FAIL,
  QUIZ_MAKER_REQUEST,
  QUIZ_MAKER_SUCCESS,
} from "./actions";

const initial = {
  triviaCategories: [],
  isLoading: false,
  error: null,
  isSubmit: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case QUIZ_MAKER_REQUEST:
      return {
        ...state,
        isLoading: true,
        triviaCategories: [],
        error: null,
      };
    case QUIZ_MAKER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        triviaCategories: payload,
        error: null,
      };
    case QUIZ_MAKER_FAIL:
      return {
        ...state,
        isLoading: false,
        triviaCategories: [],
        error: "NOT FETCH API",
      };
    case QUIZ_MAKER_CHANGE_SUBMIT_STATUS:
      return {
        ...state,
        isSubmit: payload,
      };
    default:
      return state;
  }
};

export const quizMakerStore = {
  reducer,
  initial,
};
