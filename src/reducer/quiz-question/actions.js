export const QUIZ_QUESTION_REQUEST = "QUIZ_QUESTION_REQUEST";
export const QUIZ_QUESTION_SUCCESS = "QUIZ_QUESTION_SUCCESS";
export const QUIZ_QUESTION_FAIL = "QUIZ_QUESTION_FAIL";
export const QUIZ_QUESTION_CHOSE_ANSWER = "QUIZ_QUESTION_CHOSE_ANSWER";
export const QUIZ_QUESTION_RESET = "QUIZ_QUESTION_RESET";

export const QUIZ_QUESTION_CALCULATE_RESULTS =
  "QUIZ_QUESTION_CALCULATE_RESULTS";

export const actionQuizQuestionRequest = () => ({
  type: QUIZ_QUESTION_REQUEST,
});

export const actionQuizQuestionSuccess = (payload) => ({
  type: QUIZ_QUESTION_SUCCESS,
  payload,
});

export const actionQuizQuestionFail = () => ({
  type: QUIZ_QUESTION_FAIL,
});

export const actionQuizQuestionChoseAnswer = (payload) => ({
  type: QUIZ_QUESTION_CHOSE_ANSWER,
  payload,
});

export const actionQuizQuestionCalculateResults = () => ({
  type: QUIZ_QUESTION_CALCULATE_RESULTS,
});

export const actionQuizQuestionReset = () => ({
  type: QUIZ_QUESTION_RESET,
});
