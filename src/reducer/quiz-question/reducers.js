import { shuffleArray } from "../../shared/utils/shuffle-array";
import {
  QUIZ_QUESTION_CALCULATE_RESULTS,
  QUIZ_QUESTION_CHOSE_ANSWER,
  QUIZ_QUESTION_FAIL,
  QUIZ_QUESTION_REQUEST,
  QUIZ_QUESTION_RESET,
  QUIZ_QUESTION_SUCCESS,
} from "./actions";

const initial = {
  questions: [],
  isLoading: false,
  error: null,
  isCompletedCalculate: false,
  isShowBtnSubmit: false,
  numberOfCorrectAnswer: 0,
  numberOfIncorrectAnswer: 0,
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
        questions: payload.map((item) => {
          const { correct_answer, incorrect_answers } = item;
          return {
            ...item,
            selectedAnswer: "",
            answers: shuffleArray([correct_answer, ...incorrect_answers]),
          };
        }),
        error: null,
      };
    case QUIZ_QUESTION_FAIL:
      return {
        ...state,
        isLoading: false,
        questions: [],
        error: "NOT FETCH API",
      };

    case QUIZ_QUESTION_CHOSE_ANSWER:
      let count = 0;
      const questions = state.questions.map((question) => {
        if (question.selectedAnswer) count++;

        if (question.question === payload.question) {
          if (!question.selectedAnswer) count++;

          return {
            ...question,
            selectedAnswer: payload.selectedAnswer,
          };
        }
        return question;
      });
      return {
        ...state,
        questions,
        isShowBtnSubmit: count === questions.length,
      };
    case QUIZ_QUESTION_CALCULATE_RESULTS:
      let numberOfCorrectAnswer = 0;
      let numberOfIncorrectAnswer = 0;

      state.questions.forEach((item) => {
        if (item.selectedAnswer === item.correct_answer) {
          numberOfCorrectAnswer++;
        } else {
          numberOfIncorrectAnswer++;
        }
      });
      return {
        ...state,
        numberOfCorrectAnswer,
        numberOfIncorrectAnswer,
        isCompletedCalculate: true,
      };
    case QUIZ_QUESTION_RESET:
      return { ...initial };
    default:
      return state;
  }
};

export const quizQuestion = {
  reducer,
  initial,
};
