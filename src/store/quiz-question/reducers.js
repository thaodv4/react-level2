import {
  QUIZ_QUESTION_CHANGE_SUBMIT_STATUS,
  QUIZ_QUESTION_FAIL,
  QUIZ_QUESTION_REQUEST,
  QUIZ_QUESTION_SUCCESS,
} from "./actions";

const initial = {
  questions: [],
  isLoading: false,
  error: null,
  isSubmit: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case QUIZ_QUESTION_REQUEST:
      return {
        ...state,
        isLoading: true,
        questions: [],
        error: null,
      };
    case QUIZ_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questions: payload,
        error: null,
      };
    case QUIZ_QUESTION_FAIL:
      return {
        ...state,
        isLoading: false,
        questions: [],
        error: "NOT FETCH API",
      };
    case QUIZ_QUESTION_CHANGE_SUBMIT_STATUS:
      return {
        ...state,
        isSubmit: payload,
      };
    default:
      return state;
  }
};

export const quizQuestionStore = {
  reducer,
  initial,
};
